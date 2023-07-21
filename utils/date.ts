export const parseDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("default", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};
