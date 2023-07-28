"use client";

import { useRouter } from "next/navigation";
import { articleApi } from "@/axios/domain/article";
import { PAGE_LINKS } from "@/constants/links";
import { useTransition } from "react";
import ButtonSpinner from "../@Shared/Spinner/ButtonSpinner";

interface IProps {
  slug: string;
}

function ArticleDeleteButton({ slug }: IProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleArticleDelete = () => {
    startTransition(async () => {
      await articleApi.deleteArticle(slug);
      router.push(PAGE_LINKS.home);
    });
  };

  return (
    <button
      className="btn btn-outline-danger btn-sm"
      onClick={handleArticleDelete}
      disabled={isPending}
    >
      {isPending ? <ButtonSpinner /> : <i className="ion-trash-a" />} Delete Article
    </button>
  );
}

export default ArticleDeleteButton;
