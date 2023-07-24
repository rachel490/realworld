import Link from "next/link";
import { IArticle } from "@/types";
import { PAGE_LINKS } from "@/constants/links";
import TagList from "../Tag/TagList";
import Avatar from "../@Shared/Avatar/Avatar";

interface IProps {
  articleData: IArticle;
}

function ArticleCard({ articleData }: IProps) {
  const {
    title,
    favorited,
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
        <button
          className={`btn btn-sm pull-xs-right ${
            favorited ? "btn-primary" : "btn-outline-primary"
          } `}
        >
          <i className="ion-heart" />
          {favoritesCount}
        </button>
      </div>
      <Link href={PAGE_LINKS.article(slug)} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
      <TagList tags={tagList} type="outline" />
    </div>
  );
}

export default ArticleCard;
