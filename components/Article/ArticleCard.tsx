import Image from "next/image";
import Link from "next/link";
import { IArticle } from "@/types/api";
import { parseDate } from "@/utils/date";
import TagList from "../Tag/TagList";

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
        <Link href={`/profile/${username}`}>
          <Image src={image} alt="profile" width={32} height={32} />
        </Link>
        <div className="info">
          <Link href="/" className="author">
            {username}
          </Link>
          <span className="date">{parseDate(createdAt)}</span>
        </div>
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
