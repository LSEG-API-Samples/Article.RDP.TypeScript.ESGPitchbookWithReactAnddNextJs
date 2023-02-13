export async function fetchRetry(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> {
  let retries = 0;
  while (true) {
    try {
      return await fetch(input, init);
    } catch (e) {
      if (retries++ >= 10) {
        throw e;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}
