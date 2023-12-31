/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ICommentBody } from "@/types";
import { commentsApi } from "@/axios/domain/comment";
import ButtonSpinner from "@/components/@Shared/Spinner/ButtonSpinner";

interface IProps {
  slug: string;
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1690016024119-da444e8451fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";

function CommentForm({ slug }: IProps) {
  const router = useRouter();
  const session = useSession();
  const [content, setContent] = useState<ICommentBody["comment"]["body"]>("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await commentsApi.postComment(slug, { comment: { body: content } });
      router.refresh();
      setContent("");
    });
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          value={content}
          onChange={handleChange}
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
        />
      </div>
      <div className="card-footer">
        <Image
          alt=""
          width="30"
          height="30"
          src={session.data?.user.image || PLACEHOLDER_IMAGE}
          className="comment-author-img"
        />
        <button
          className="btn btn-sm btn-primary"
          type="submit"
          disabled={!content.length || isPending}
        >
          {isPending && <ButtonSpinner />}Post Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
