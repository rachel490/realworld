/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useState } from "react";
import { articleApi } from "@/api/domain/article";

interface IProps {
  favoritesCount: number;
  isFavorited: boolean;
  slug: string;
}

function LikeButton({ favoritesCount, isFavorited, slug }: IProps) {
  const [favorited, setFavorited] = useState(isFavorited);
  const [favoriteCount, setFavoriteCount] = useState(favoritesCount);

  const handleClick = async () => {
    if (favorited) {
      const { article } = await articleApi.unlikeArticle(slug);
      setFavorited(article.favorited);
      setFavoriteCount(article.favoritesCount);
    } else {
      const { article } = await articleApi.likeArticle(slug);
      setFavorited(article.favorited);
      setFavoriteCount(article.favoritesCount);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-sm ${favorited ? "btn-primary" : "btn-outline-primary"}`}
    >
      <i className="ion-heart" />
      &nbsp; {`${favorited ? "Unfavorite" : "Favorite"}`} Article
      <span className="counter">{`(${favoriteCount})`}</span>
    </button>
  );
}

export default LikeButton;
