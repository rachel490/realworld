/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useRouter } from "next/navigation";
import { PAGE_LINKS } from "@/constants/links";
import { deleteTokenCookie } from "@/utils/token";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await deleteTokenCookie();
    router.refresh();
    router.push(PAGE_LINKS.home);
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Or click here to logout.
    </button>
  );
}

export default LogoutButton;
