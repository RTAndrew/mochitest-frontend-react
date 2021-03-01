interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

const API_URL = 'https://api.github.com/';

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  try {
    response.parsedBody = await response.json();
  } catch (ex) {}

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = {
    method: 'get',
    headers: {
      Accept: 'application/vnd.github.cloak-preview',
      Authorization: `token ${process.env.REACT_APP_TOKEN}`,
    },
  },
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(API_URL + path, args));
}
