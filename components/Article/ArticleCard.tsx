import Link from "next/link";
import { IArticle } from "@/types";
import TagList from "../Tag/TagList";
import Avatar from "../@Shared/Avatar/Avatar";

interface IProps {
  articleData: IArticle;
}

function ArticleCard({ articleData }: IProps) {
  const {
    title,
    favoritesCount,
    description,
    author: { username, image },
    createdAt,
    slug,
    tagList,
  } = articleData;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Avatar username={username} image={image} createdAt={createdAt} />
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" />
          {favoritesCount}
        </button>
      </div>
      <Link href={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
      <TagList tags={tagList} type="outline" />
    </div>
  );
}

export default ArticleCard;
