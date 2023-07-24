/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { deleteToken } from "@/app/action";

function LogoutButton() {
  const handleLogout = async () => {
    await deleteToken();
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Or click here to logout.
    </button>
  );
}

export default LogoutButton;
