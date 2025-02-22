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

  // 尝试获取作业
  if (Deno.statSync(`${cwd}\\homework\\${generate_today_string()}.json`)) {
    return generate_response(
      JSON.stringify(
        JSON.parse(
          new TextDecoder("utf-8").decode(
            Deno.readFileSync(
              `${cwd}\\homework\\${generate_today_string()}.json`
            )
          )
        )
      ),
      200,
      generate_headers({ key: "Content-Type", value: "application/json" })
    );
  } else {
    return generate_response(
      `{"msg":"读取失败，无今天的作业"}`,
      400,
      generate_headers({ key: "Content-Type", value: "application/json" })
    );
  }
}

export default handler;
