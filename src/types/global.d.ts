type Messages = typeof import("../locales/en-us.ts").default;
declare interface IntlMessages extends Messages {}

type LanguageParams = {
    readonly language: string;
}

type IObject<T=any> = Record<string, T>;
type HttpResponse<T=IObject> = {
    code: number;
    msg: string;
    data: T;
}