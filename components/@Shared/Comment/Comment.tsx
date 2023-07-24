import Image from "next/image";
import Link from "next/link";
import { IComment } from "@/types";
import { parseDate } from "@/utils/date";
import { PAGE_LINKS } from "@/constants/links";

interface IProps {
  comment: IComment;
}

function Comment({ comment }: IProps) {
  const {
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
      </div>
    </div>
  );
}

export default Comment;
