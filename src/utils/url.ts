export const createUrl = (
  url: string | URL,
  base?: string | URL | undefined,
): URL => {
  return new URL(url, base);
};

export const getHostname = (
  url: string | URL,
  base?: string | URL | undefined,
): string => {
  const urlObj = createUrl(url, base);

  return urlObj?.hostname ?? '';
};