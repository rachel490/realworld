import Link from "next/link";

interface IProps {
  tags: string[];
  type?: "outline";
}

function TagList({ tags, type }: IProps) {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Link
          href={{ pathname: "/", query: { feed: "tag", tagName: tag } }}
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
