export async function providerFetch(url: string, init: RequestInit, timeoutMs = 12_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch {
    throw new Error("Provider request failed");
  } finally {
    clearTimeout(timeout);
  }
}
