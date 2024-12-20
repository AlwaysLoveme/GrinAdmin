import { useMemo } from "react";
import { useSWRConfig, SWRConfig } from "swr";
import type { FC, PropsWithChildren } from "react";
import type { SWRConfiguration, Middleware, SWRHook } from "swr";

const swrMiddleware: Middleware = (useSWRNext: SWRHook) => {
  return (key, fetcher, config) => {
    const { cache } = useSWRConfig();
    const handlerFetcher = async (...args: any) => {
      if (typeof key === "string") {
        const cacheData = (cache as Map<string, { data?: any }>).get(key)?.data || null;
        if (!!cacheData && key.startsWith("enum-")) {
          return cacheData;
        }
      }
      return fetcher?.(...args);
    };
    // 处理下一个中间件，如果这是最后一个，则处理 `useSWR` hook。
    return useSWRNext(key, handlerFetcher, config);
  };
};

const SWRConfigProvider: FC<PropsWithChildren> = (props) => {
  const configValue = useMemo<SWRConfiguration>(
    () => ({
      use: [swrMiddleware],
      revalidateOnFocus: false,
      provider: () => new Map(),
      onErrorRetry(error, _key, _config, revalidate, { retryCount }) {
        console.log(error, "swrError");
        // 404、401 时不重试。
        if ((error?.status as string)?.toString().startsWith("4")) return;

        // 最多重试 3 次。
        if (retryCount >= 3) return;

        // 5秒后重试。
        setTimeout(() => {
          revalidate({
            retryCount: retryCount,
          });
        }, 5000);
      },
    }),
    [],
  );
  return (
    <SWRConfig
      value={configValue}
      {...props}
    />
  );
};

export default SWRConfigProvider;
