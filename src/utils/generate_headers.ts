// 快速创建Headers
export default function (...values: { key: string; value: string }[]): Headers {
  const headers = new Headers();
  values.forEach((item) => {
    headers.append(item.key, item.value);
  });
  return headers;
}
