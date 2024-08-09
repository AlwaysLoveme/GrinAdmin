import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

export type HttpResponse<T = any> = {
  code?: number;
  msg?: string;
  data: T;
};
export type RequestOptions = {
  data?: Record<string, any> | FormData;
  getOriginResponse?: boolean;
  nextRequest?: NextRequest;
  baseURL?: string;
  requestInit?: Omit<RequestInit, "body">;
};

export async function serverFetch(
  url: string,
  opt?: RequestOptions & {
    getOriginResponse: true;
  },
): Promise<Response>;
export async function serverFetch<T = any>(
  url: string,
  opt?: RequestOptions,
): Promise<HttpResponse<T>>;
export async function serverFetch<T = any>(url: string, opt: RequestOptions = {}) {
  const {
    requestInit,
    nextRequest,
    getOriginResponse = false,
    data,
    baseURL = process.env.NEXT_PUBLIC_SERVER_API,
  } = opt;
  const token = cookies().get("Authorization");
  const defaultRequestInit: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  };
  let requestUrl = `${baseURL}${url}`;
  const mergedRequestInit: RequestInit = {
    ...defaultRequestInit,
    ...requestInit,
  };
  if (token) {
    mergedRequestInit.headers = {
      ...mergedRequestInit.headers,
      Authorization: token.value || "",
    };
  }

  const headers = nextRequest?.headers;
  const authorization = headers?.get("Authorization");
  if (authorization) {
    mergedRequestInit.headers = {
      ...mergedRequestInit.headers,
      Authorization: authorization,
    };
  }
  if (mergedRequestInit?.method === "GET" && data && !(data instanceof FormData)) {
    requestUrl += `?${new URLSearchParams(data).toString()}`;
  } else {
    mergedRequestInit.body = data instanceof FormData ? data : JSON.stringify(data);
  }
  return fetch(requestUrl, mergedRequestInit)
    .then((response) => {
      if (response.ok && !getOriginResponse) {
        return response.json();
      }
      return response;
    })
    .then((res) => res as HttpResponse<T> | Response);
}
