import Link from "next/link";

interface IProps {
  username: string;
  currentTab: "My Articles" | "Favorited Articles";
}

const profileTabMenus = (username: string) => [
  {
    name: "My Articles",
    link: `/profile/${username}`,
  },
  {
    name: "Favorited Articles",
    link: `/profile/${username}/favorites`,
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
