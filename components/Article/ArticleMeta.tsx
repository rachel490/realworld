import { IArticle } from "@/types";
import Avatar from "../@Shared/Avatar/Avatar";
import FollowButton from "../@Shared/Button/FollowButton/FollowButton";
import LikeButton from "../@Shared/Button/LikeButton/LikeButton";

interface IProps {
  article: IArticle;
}

function ArticleMeta({ article }: IProps) {
  const {
    slug,
    author: { username, image, following },
    createdAt,
    favorited,
    favoritesCount,
  } = article;
  return (
    <div className="article-meta">
      <Avatar username={username} image={image} createdAt={createdAt} />
      <FollowButton isFollowing={following} username={username} />
      &nbsp;&nbsp;
      <LikeButton favoritesCount={favoritesCount} isFavorited={favorited} slug={slug} />
    </div>
  );
}

export default ArticleMeta;
