"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PAGE_LINKS } from "@/constants/links";

const authenticatedNavMenus = (username: string) => [
  {
    name: "Home",
    link: PAGE_LINKS.home,
  },
  {
    name: "New Article",
    link: PAGE_LINKS.newPost,
    icon: "ion-compose",
  },
  {
    name: "Settings",
    link: PAGE_LINKS.settings,
    icon: "ion-gear-a",
  },
  {
    name: "Image",
    link: PAGE_LINKS.profilePosts(username),
  },
];

function AuthenticatedHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useSession();

  if (!data || !data.user) {
    router.push(PAGE_LINKS.register);
    return null;
  }

  const { username, image } = data.user;

  const isActiveMenu = (menuLink: string) => {
    if (pathname === "/") {
      if (menuLink === "/") return true;
      return false;
    }
    if (menuLink.includes(pathname)) return true;
    return false;
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" href="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {authenticatedNavMenus(username).map(menu => (
            <li className="nav-item" key={menu.name}>
              <Link
                className={`${isActiveMenu(menu.link) ? "active" : ""} nav-link`}
                href={menu.link}
              >
                {menu.name === "Image" ? (
                  <>
                    <Image
                      src={image}
                      className="user-pic"
                      width="25"
                      height="25"
                      alt="user profile"
                    />
                    {username}
                  </>
                ) : (
                  <>
                    {menu.icon && <i className={menu.icon} />}
                    {menu.name}
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default AuthenticatedHeader;
