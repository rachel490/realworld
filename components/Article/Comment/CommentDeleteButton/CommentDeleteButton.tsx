/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { commentsApi } from "@/api/domain/comment";
import { useRouter } from "next/navigation";

interface IProps {
  slug: string;
  commentId: number;
}

function CommentDeleteButton({ slug, commentId }: IProps) {
  const router = useRouter();

  const handleDeleteComment = async () => {
    await commentsApi.deleteComment(slug, commentId);
    router.refresh();
  };
  return (
    <button className="mod-options" onClick={handleDeleteComment}>
      <i className="ion-trash-a" />
    </button>
  );
}

export default CommentDeleteButton;
