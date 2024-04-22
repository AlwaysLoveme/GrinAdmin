type Messages = typeof import("../locales/en-us.ts").default;
declare interface IntlMessages extends Messages {}

type LanguageParams = {
    readonly language: string;
}