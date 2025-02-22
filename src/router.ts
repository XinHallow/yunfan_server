import handlers from "./handler/mod.ts";
import generate_response from "./utils/generate_response.ts";

export default function (request: Request): Response {
  for (const handler of handlers) {
    const status = handler(request);
    if (status instanceof Error) {
      continue;
    }
    return status;
  }
  return generate_response("无法处理的请求", 400, new Headers());
}
