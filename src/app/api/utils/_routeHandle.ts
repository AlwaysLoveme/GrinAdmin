import mongoose from "mongoose";
import dbConnect from "src/db/connection";
import { NextRequest, NextResponse } from "next/server";

import type { HttpResponse } from "./_fetch";

interface Params {
  path: string[];
}
export type Handler = (
  req: NextRequest,
  ctx: { params: Promise<Params> },
) => Promise<HttpResponse | Response>;

/**
 * 统一处理 API 返回数据
 * @param handler
 */
export function routeHandle(handler: Handler) {
  return async function request(req: NextRequest, ctx: { params: Promise<Params> }) {
    try {
      const data = await handler?.(req, ctx);
      if (data instanceof Response) {
        const response = data;
        if (response.status === 401) {
          // 未登录
          const headers = response.headers;
          const location = headers.get("Location");
          if (location) {
            return NextResponse.json(
              {
                code: 401,
                msg: "未登录",
              },
              {
                status: 200,
                headers: {
                  location,
                },
              },
            );
          }
        }
      }
      return NextResponse.json({ code: 0, msg: "操作成功", ...data });
    } catch (e) {
      return NextResponse.json(
        {
          code: 500,
          msg: (e as Error).message || "Internal Server Error",
        },
        { status: 200 },
      );
    }
  };
}

interface HandleDBOptions {
  /**
   * 是否需要保持连接数据库
   */
  connectDB?: boolean;
}
/**
 * 统一处理 API 返回数据
 * @param handler
 * @param options
 */
export function handleWithDB(handler: Handler, options?: HandleDBOptions) {
  return async function request(req: NextRequest, ctx: { params: Promise<Params> }) {
    const { connectDB = true } = options ?? {};
    try {
      if (connectDB) {
        await dbConnect();
      }
      const data = await handler?.(req, ctx);
      return NextResponse.json({
        code: 200,
        msg: "操作成功",
        ...data,
      });
    } catch (e) {
      let errorMessage = e?.toString();
      if (e instanceof mongoose.Error.ValidationError) {
        errorMessage = Object.values(e.errors)
          .map((error) => error.message)
          .join("；");
      }
      if (e instanceof mongoose.Error) {
        errorMessage = `${e.name}: ${e.message}`;
      }
      return NextResponse.json(
        {
          code: 500,
          data: null,
          msg: errorMessage ?? "Internal Server Error",
        },
        { status: 200 },
      );
    } finally {
      if (connectDB) {
        await mongoose.connection.close();
      }
    }
  };
}
