/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import { PAGE_LINKS } from "@/constants/links";
import { getServerComponentPathname } from "@/utils/serverActions";

interface IProps {
  feedList: string[];
  currentFeed: string;
}

const feedLinks: { [key: string]: string } = {
  "Global Feed": PAGE_LINKS.home,
  "Your Feed": `${PAGE_LINKS.home}?feed=my`,
};

function FeedNavbar({ feedList, currentFeed }: IProps) {
  const pathname = getServerComponentPathname();

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {feedList.map(feedName => (
          <li className="nav-item" key={feedName}>
            <Link
              className={`nav-link ${currentFeed === feedName ? "active" : ""}`}
              href={
                feedName.includes("Feed")
                  ? feedLinks[feedName]
                  : `${PAGE_LINKS.home}?${pathname.split("?")[1]}`
              }
            >
              {feedName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedNavbar;
