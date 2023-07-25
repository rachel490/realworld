import Link from "next/link";
import { IArticle } from "@/types";
import { PAGE_LINKS } from "@/constants/links";
import TagList from "../Home/Tag/TagList";
import Avatar from "../@Shared/Avatar/Avatar";
import LikeButton from "../@Shared/Button/LikeButton";

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
        <LikeButton
          favoritesCount={favoritesCount}
          isFavorited={favorited}
          slug={slug}
          type="short"
        />
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
