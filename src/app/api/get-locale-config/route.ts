import { NextRequest, NextResponse } from "next/server";

import ZhCn from "src/locales/zh-cn";
import EnUs from "src/locales/en-us";

export const GET = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "zh-cn";
  const language: Record<string, any> = {
    "zh-cn": ZhCn,
    "en-us": EnUs,
  };
  return NextResponse.json(language[locale], { status: 200 });
};
