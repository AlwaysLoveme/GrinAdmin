import { routeHandle } from "src/app/api/utils/_routeHandle";
import { serverFetch } from "src/app/api/utils/_fetch";


type FetchBody = {
    method: string;
    data?: Record<string, string>;
}
export const POST = routeHandle(async (nextRequest, ctx) => {
	const originURL = "/" + ctx.params.path.join("/");
	const requestBody: FetchBody = await nextRequest.json();
	const { method = "POST", data = {} } = requestBody;
	return serverFetch(originURL, {
		data,
		nextRequest,
		requestInit: {
			method,
		}
	});
});