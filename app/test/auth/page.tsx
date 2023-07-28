/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-unresolved */

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function NextAuthPage() {
  const { data: session } = useSession();

  return (
    <div className="flex gap-5 p-2 bg-slate-200 ">
      <Link className="text-sky-600 hover:text-sky-700" href="/">
        Home
      </Link>
      <div>{JSON.stringify(session?.user.token)}</div>

      <div className="flex gap-2 ml-auto">
        {session?.user ? (
          <>
            <img className="w-8 h-8 rounded-full" src={session.user.image || ""} alt="" />
            <p className="text-sky-600"> {session.user.email}</p>
            <button className="text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="text-green-600" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
export default NextAuthPage;
