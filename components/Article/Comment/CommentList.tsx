import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuth";
import { commentsApi } from "@/axios/domain/comment";
import Comment from "./Comment";

interface IProps {
  slug: string;
}

async function CommentList({ slug }: IProps) {
  const session = await getServerSession(nextAuthOptions);
  const { comments } = await commentsApi.getComments(slug);

  const currentUsername = session?.user.username || "";

  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} currentUsername={currentUsername} slug={slug} />
      ))}
    </div>
  );
}

export default CommentList;
