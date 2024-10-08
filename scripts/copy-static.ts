import path from "path";
import { exec } from "child_process";

const root = process.cwd();
const publicPath = path.join(root, "public");
const staticPath = path.join(root, ".next/static");
const targetPublicFolder = path.join(root, `.next/standalone/public`);
const targetStaticFolder = path.join(root, `.next/standalone/.next/static`);

// const sourceBuildFolder = path.join(root, ".next/standalone");
// const targetBuildFolder = path.join(root, "dist");

exec(`cp -r ${publicPath} ${targetPublicFolder}`); // 复制文件夹，目标目录可以自动创建
exec(`cp -r ${staticPath} ${targetStaticFolder}`); // 复制文件夹，目标目录可以自动创建

// exec(`cp -r ${sourceBuildFolder} ${targetBuildFolder}`); // 复制产物文件夹，目标目录可以自动创建
