/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useRouter } from "next/navigation";
import { articleApi } from "@/api/domain/article";
import { PAGE_LINKS } from "@/constants/links";

interface IProps {
  slug: string;
}

function ArticleDeleteButton({ slug }: IProps) {
  const router = useRouter();

  const handleArticleDelete = async () => {
    await articleApi.deleteArticle(slug);
    router.push(PAGE_LINKS.home);
  };

  return (
    <button className="btn btn-outline-danger btn-sm" onClick={handleArticleDelete}>
      <i className="ion-trash-a" /> Delete Article
    </button>
  );
}

export default ArticleDeleteButton;
