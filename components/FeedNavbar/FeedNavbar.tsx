import Link from "next/link";

interface IProps {
  feedList: string[];
  currentFeed: string;
}

function FeedNavbar({ feedList, currentFeed }: IProps) {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {feedList.map(feedName => (
          <li className="nav-item" key={feedName}>
            <Link className={`nav-link ${currentFeed === feedName ? "active" : ""}`} href="/">
              {feedName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedNavbar;
