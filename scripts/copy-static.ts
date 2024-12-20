import path from "path";
import cpy from "cpy";

const root = process.cwd();
const publicPath = path.join(root, "public", "/**");
const staticPath = path.join(root, ".next/static", "/**");
const targetPublicFolder = path.join(root, `.next/standalone/public`);
const targetStaticFolder = path.join(root, `.next/standalone/.next/static`);

(async function () {
  await Promise.all([cpy(publicPath, targetPublicFolder), cpy(staticPath, targetStaticFolder)]);
  await cpy(path.join(root, `.next/standalone`, "/**"), "dist");
})();
