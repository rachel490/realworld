/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { PAGE_LINKS } from "@/constants/links";
import { useTransition } from "react";
import ButtonSpinner from "../@Shared/Spinner/ButtonSpinner";

function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      signOut();
      router.push(PAGE_LINKS.home);
    });
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout} disabled={isPending}>
      {isPending ? <ButtonSpinner /> : <>Or click here to logout.</>}
    </button>
  );
}

export default LogoutButton;
