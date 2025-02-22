import { cwd } from "../constants.ts";
import generate_headers from "../utils/generate_headers.ts";
import generate_response from "../utils/generate_response.ts";
import generate_today_string from "../utils/generate_today_string.ts";
import { homework_default } from "./patterns.ts";

// /homework 的handler
function handler(request: Request): Response | Error {
  // 如果方法不对
  if (request.method !== "GET") {
    return new Error("错误的方法");
  }
  // 如果不匹配
  if (!homework_default.exec(request.url)) {
    return new Error("错误的URL");
  }

  const file_path = `${cwd}/${generate_today_string()}.json`;
  // 检查文件是否存在
  try {
    Deno.statSync(file_path);
    const file_content = new TextDecoder("utf-8").decode(
      Deno.readFileSync(file_path)
    );
    return generate_response(
      file_content,
      200,
      generate_headers({ key: "Content-Type", value: "application/json" })
    );
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      return generate_response(
        `{"msg":"文件不存在，无法获取今天作业"}`,
        400,
        generate_headers({ key: "Content-Type", value: "application/json" })
      );
    }
  }
  return new Error("未知错误");
}

export default handler;
