import { headers } from "next/headers";

export const getServerComponentPathname = () => {
  const headersList = headers();
  const headerUrl = headersList.get("x-pathUrl") || "";
  return headerUrl;
};
