// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonToURLEncoded(object: Record<string, any>) {
  const queries = [];
  for (const key in object) {
    let value = object[key];
    if (Array.isArray(value)) {
      value = value.join(' ');
    }

    queries.push(key + '=' + encodeURIComponent(value));
  }
  return queries.join('&');
}