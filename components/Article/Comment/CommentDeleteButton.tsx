/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { commentsApi } from "@/api/domain/comment";
import ButtonSpinner from "@/components/@Shared/Spinner/ButtonSpinner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface IProps {
  slug: string;
  commentId: number;
}

function CommentDeleteButton({ slug, commentId }: IProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDeleteComment = () => {
    startTransition(async () => {
      await commentsApi.deleteComment(slug, commentId);
      router.refresh();
    });
  };
  return (
    <button className="mod-options" onClick={handleDeleteComment} disabled={isPending}>
      {isPending ? <ButtonSpinner /> : <i className="ion-trash-a" />}
    </button>
  );
}

export default CommentDeleteButton;
