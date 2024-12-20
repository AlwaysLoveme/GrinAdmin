type Messages = typeof import("../locales/en-us.ts").default;
declare interface IntlMessages extends Messages {}

interface LanguageParams {
  readonly language: string;
}

type IObject<T = any> = Record<string, T>;
interface HttpResponse<T = IObject> {
  code: number;
  msg: string;
  data: T;
}
