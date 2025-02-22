// 快速创建Response对象
export default function (
  body: string,
  status: number,
  headers: Headers
): Response {
  return new Response(body, {
    status: status,
    statusText: status.toString(),
    headers: headers,
  });
}
