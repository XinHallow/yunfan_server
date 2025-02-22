import generate_headers from "../utils/generate_headers.ts";
import generate_response from "../utils/generate_response.ts";
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

  return generate_response(
    `{"1":1}`,
    200,
    generate_headers({ key: "Content-Type", value: "application/json" })
  );
}

export default handler;
