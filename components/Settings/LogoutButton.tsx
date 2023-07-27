/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { PAGE_LINKS } from "@/constants/links";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push(PAGE_LINKS.home);
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Or click here to logout.
    </button>
  );
}

export default LogoutButton;
