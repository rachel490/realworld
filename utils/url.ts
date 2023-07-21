export const generateQueryString = (options: { [key: string]: string | number | undefined }) => {
  const params = new URLSearchParams();

  Object.entries(options).forEach(([key, value]) => {
    if (value) params.append(key, typeof value === "number" ? value.toString() : value);
  });

  return params.toString();
};

export const generateURL = (baseUrl: string, searchParams?: { [key: string]: string }) => {
  const url = new URL(baseUrl);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => url.searchParams.set(key, value));
  }

  return url.toString();
};
