import Image from "next/image";
import Link from "next/link";
import { IComment } from "@/types";
import { parseDate } from "@/utils/date";
import { PAGE_LINKS } from "@/constants/links";
import CommentDeleteButton from "./CommentDeleteButton/CommentDeleteButton";

interface IProps {
  comment: IComment;
  currentUsername?: string;
  slug: string;
}

function Comment({ comment, currentUsername, slug }: IProps) {
  const {
    id,
    author: { username, image },
    body,
    createdAt,
  } = comment;

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>
      <div className="card-footer">
        <Link href={PAGE_LINKS.profilePosts(username)} className="comment-author">
          <Image alt="profile" width="30" height="30" src={image} className="comment-author-img" />
          <span>{username}</span>
          <span className="date-posted">{parseDate(createdAt)}</span>
        </Link>
        {currentUsername && currentUsername === username ? (
          <CommentDeleteButton slug={slug} commentId={id} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Comment;
