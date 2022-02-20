// import wretch from "wretch";

// const server = wretch("url");

export function fakeApi<TResponse>(response: TResponse): Promise<TResponse> {
  return new Promise((res) => setTimeout(() => res(response), 500));
}
