"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGE_LINKS } from "@/constants/links";

const navMenus = [
  {
    name: "Home",
    link: PAGE_LINKS.home,
  },
  {
    name: "Sign in",
    link: PAGE_LINKS.login,
  },
  {
    name: "Sign up",
    link: PAGE_LINKS.register,
  },
];

function Header() {
  const currentPathname = usePathname();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" href={PAGE_LINKS.home}>
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
