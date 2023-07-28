/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { articleApi } from "@/axios/domain/article";
import { PAGE_LINKS } from "@/constants/links";
import { useSession } from "next-auth/react";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface IProps {
  favoritesCount: number;
  isFavorited: boolean;
  slug: string;
  type?: "short" | "long";
}

function LikeButton({ favoritesCount, isFavorited, slug, type = "long" }: IProps) {
  const session = useSession();
  const router = useRouter();
  const [favorited, setFavorited] = useState(isFavorited);
  const [favoriteCount, setFavoriteCount] = useState(favoritesCount);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!session || session.status === "unauthenticated") {
      router.push(PAGE_LINKS.register);
      return;
    }

    startTransition(async () => {
      if (favorited) {
        const { article } = await articleApi.unlikeArticle(slug);
        setFavorited(article.favorited);
        setFavoriteCount(article.favoritesCount);
        router.refresh();
      } else {
        const { article } = await articleApi.likeArticle(slug);
        setFavorited(article.favorited);
        setFavoriteCount(article.favoritesCount);
        router.refresh();
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-sm
        ${favorited ? "btn-primary" : "btn-outline-primary"} 
        ${type === "short" ? "pull-xs-right" : ""}`}
      disabled={isPending}
    >
      {isPending ? <ButtonSpinner /> : <i className="ion-heart" />}
      {type === "short" ? (
        favoriteCount
      ) : (
        <>
          &nbsp; {`${favorited ? "Unfavorite" : "Favorite"}`} Article
          <span className="counter">{`(${favoriteCount})`}</span>
        </>
      )}
    </button>
  );
}

export default LikeButton;
