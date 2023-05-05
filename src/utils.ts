import qs from 'querystring';

function isomorphicEscape(value: string) {
  if (typeof window === 'undefined') {
    return qs.escape(value);
  } else {
    return encodeURIComponent(value);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonToURLEncoded(object: Record<string, any>) {
  const queries: string[] = [];
  for (const key in object) {
    let value = object[key];
    if (Array.isArray(value)) {
      value = value.join(' ');
    }

    queries.push(key + '=' + isomorphicEscape(value));
  }
  return queries.join('&');
}
