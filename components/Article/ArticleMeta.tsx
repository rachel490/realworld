import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuth";
import { IArticle } from "@/types";
import { PAGE_LINKS } from "@/constants/links";
import Avatar from "../@Shared/Avatar/Avatar";
import FollowButton from "../@Shared/Button/FollowButton";
import LikeButton from "../@Shared/Button/LikeButton";
import ArticleDeleteButton from "./ArticleDeleteButton";

interface IProps {
  article: IArticle;
}

async function ArticleMeta({ article }: IProps) {
  const {
    slug,
    author: { username, image, following },
    createdAt,
    favorited,
    favoritesCount,
  } = article;

  const session = await getServerSession(nextAuthOptions);

  const isAuthorCurrentUser = session?.user.username === username;

  return (
    <div className="article-meta">
      <Avatar username={username} image={image} createdAt={createdAt} />
      {isAuthorCurrentUser ? (
        <>
          <Link className="btn btn-outline-secondary btn-sm" href={PAGE_LINKS.editPost(slug)}>
            <i className="ion-edit" /> Edit Article
          </Link>
          &nbsp;&nbsp;
          <ArticleDeleteButton slug={slug} />
        </>
      ) : (
        <>
          <FollowButton isFollowing={following} username={username} />
          &nbsp;&nbsp;
          <LikeButton favoritesCount={favoritesCount} isFavorited={favorited} slug={slug} />
        </>
      )}
    </div>
  );
}

export default ArticleMeta;
