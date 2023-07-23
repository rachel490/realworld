import Link from "next/link";
import { PAGE_LINKS } from "@/constants/links";

interface IProps {
  username: string;
  currentTab: "My Articles" | "Favorited Articles";
}

const profileTabMenus = (username: string) => [
  {
    name: "My Articles",
    link: PAGE_LINKS.profilePosts(username),
  },
  {
    name: "Favorited Articles",
    link: PAGE_LINKS.profileFavorites(username),
  },
];

function ProfileTabMenu({ username, currentTab }: IProps) {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        {profileTabMenus(username).map(menu => (
          <li className="nav-item" key={menu.name}>
            <Link
              className={`nav-link ${currentTab === menu.name ? "active" : ""}`}
              href={menu.link}
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileTabMenu;
