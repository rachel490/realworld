"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navMenus = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Sign in",
    link: "/login",
  },
  {
    name: "Sign up",
    link: "/register",
  },
];

function Header() {
  const currentPathname = usePathname();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" href="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {navMenus.map(menu => (
            <li key={menu.name} className="nav-item">
              <Link
                className={`nav-link ${currentPathname === menu.link ? "active" : ""}`}
                href={menu.link}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
