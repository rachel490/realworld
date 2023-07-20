export const generateQueryString = (options: { [key: string]: string | number | undefined }) => {
  const params = new URLSearchParams();

  Object.entries(options).forEach(([key, value]) => {
    if (value) params.append(key, typeof value === "number" ? value.toString() : value);
  });

  return params.toString();
};
