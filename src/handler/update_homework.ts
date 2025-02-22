import { update_homework } from "./patterns.ts";
import { check_is_homework } from "../homework.ts";
import generate_response from "../utils/generate_response.ts";
import generate_headers from "../utils/generate_headers.ts";
import generate_today_string from "../utils/generate_today_string.ts";
import { cwd } from "../constants.ts";

function handler(request: Request): Response | Error {
  // 如果方法不对
  if (request.method !== "POST") {
    return new Error("错误的方法");
  }
  // 如果不匹配
  if (!update_homework.exec(request.url)) {
    return new Error("错误的URL");
  }
  // 如果上传类型不同
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Error("Content-Type错误");
  }

  // 解析并写入
  request.json().then((value) => {
    // 检查上传内容
    const homework_result = check_is_homework(value);
    if (homework_result instanceof Error) {
      return homework_result;
    }

    // 处理路径和文件名
    const date = generate_today_string();
    const file_path = `${cwd}/homework/${date}.json`;

    // 写入文件
    Deno.writeTextFileSync(file_path, JSON.stringify(homework_result));
  });

  return generate_response(
    `{"msg":"提交完成"}`,
    200,
    generate_headers({ key: "Content-Type", value: "application/json" })
  );
}

export default handler;
