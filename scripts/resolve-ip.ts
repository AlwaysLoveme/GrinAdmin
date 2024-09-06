import ip from "ip";
import fs from "fs";
import path from "path";

const ipAddress = ip.address();

const serverAPI = `http://${ipAddress}:3000/api/admin`;
const localEnvPath = path.resolve(__dirname, "../.env.local");

const localEnv = fs.readFileSync(localEnvPath, "utf-8");
const newLocalEnv = localEnv
  .split("\n")
  .map((line) => {
    if (line.startsWith("NEXT_PUBLIC_SERVER_API=")) {
      // Step 3: Modify the SERVER_API value
      return `NEXT_PUBLIC_SERVER_API=${serverAPI}`;
    }
    return line;
  })
  .join("\n");
fs.writeFileSync(localEnvPath, newLocalEnv, "utf-8");
