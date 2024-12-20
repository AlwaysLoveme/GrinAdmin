import { v4 as uuidV4 } from "uuid";
import { nonNullableObject } from "src/shared/utils";

export type RequestOptions = {
  /**
   * 是否获取原始响应数据，例如下载文件
   */
  getOriginResponse?: boolean;
  /**
   * 接口请求成功时的提示信息，一些涉及到用户操作的接口请求，需要提示用户操作结果
   */
  successMessage?: string;
} & Omit<RequestInit, "body">;
export type RequestData = IObject | FormData | null;

export const errorMsgRecord: Record<number, string> = {
  500: "啊哦，服务出错啦，请稍后再试",
  502: "啊哦，服务出错啦，请稍后再试",
  404: "服务找不到，请联系网站管理员",
  403: "服务请求出错啦",
  401: "身份信息已过期",
};

class HttpClient {
  /**
   * 请求基地址
   */
  baseUrl = "";
  /**
   * 请求超时时间
   */
  timeout = 30000;
  /**
   * 是否是生产环境
   */
  isProdEnv = process.env.ENV_MODE === "production";

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async request(
    url: string,
    data: RequestData,
    options: Omit<RequestOptions, "getOriginResponse"> & {
      getOriginResponse: true;
    },
  ): Promise<Response>;
  async request<T = IObject>(
    url: string,
    data?: RequestData,
    options?: RequestOptions,
  ): Promise<HttpResponse<T>>;
  /**
   * fetch request
   * @param url - 请求地址
   * @param data - 请求数据
   * @param options - 请求配置，同 fetch 的 RequestInit
   */
  async request<T = IObject>(url: string, data: RequestData = {}, options?: RequestOptions) {
    const { successMessage, getOriginResponse = false, ...userOptions } = options ?? {};

    const traceId = uuidV4();
    const requestOptions: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        vcreditTraceId: traceId,
      },
      ...userOptions,
    };

    if (requestOptions.method?.toUpperCase() !== "GET" && data) {
      requestOptions.body =
        data instanceof FormData ? data : JSON.stringify(nonNullableObject(data));
    }

    let requestURL = url;
    if (requestOptions.method?.toUpperCase() === "GET" && data) {
      const params = new URLSearchParams(data as IObject);
      requestURL = params.toString() ? `${requestURL}?${params.toString()}` : requestURL;
    }
    const formatURL = `${this.baseUrl}${requestURL}`;
    const abortController = new AbortController();
    requestOptions.signal = userOptions.signal ?? abortController.signal;
    const timer = setTimeout(() => {
      abortController.abort({
        status: 400,
      });
      // notification(`服务请求超时，请稍后再试`, {
      // 	type: "warning",
      // 	title: "友情提示",
      // 	tag: !this.isProdEnv
      // 		? `TraceId: ${traceId}; 服务: ${formatURL}`
      // 		: `TraceId: ${traceId}`,
      // });
    }, this.timeout);
    const startTime = performance.now(); // 开始计时
    const response = await fetch(formatURL, requestOptions);
    const fetchTime = performance.now() - startTime;
    clearTimeout(timer);
    if (!response.ok) {
      this.handleErrorResponse(response.clone());
      throw new Error(response.statusText);
    }
    if (!getOriginResponse) {
      this.handleResponse({
        response: response.clone(),
        successMessage,
        traceId,
        requestInit: {
          url: formatURL,
          body: requestOptions.body as IObject,
        },
        fetchTime,
      });
      try {
        return (await response.json()) as HttpResponse<T>;
      } catch (e) {
        console.log(e, "get response json error");
      }
    }
    return response;
  }
  handleErrorResponse(_response: Response) {
    // console.log(_response);
  }
  handleResponse(_options: {
    response: Response;
    successMessage?: string;
    traceId: string;
    requestInit: {
      url: string;
      body: IObject;
    };
    fetchTime: number;
  }) {
    // console.log(options);
  }
}

const httpClient = new HttpClient("/api");
export const serverClient = new HttpClient(process.env.NEXT_PUBLIC_SERVER_API ?? "");
export default httpClient;
