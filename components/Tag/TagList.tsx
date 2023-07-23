import Link from "next/link";
import { PAGE_LINKS } from "@/constants/links";

interface IProps {
  tags: string[];
  type?: "outline";
}

function TagList({ tags, type }: IProps) {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Link
          href={{ pathname: PAGE_LINKS.home, query: { feed: "tag", tagName: tag } }}
          key={tag}
          className={`tag-pill tag-default ${type === "outline" ? "tag-outline" : ""}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

export default TagList;
