import { commentsApi } from "@/api/domain/comment";
import Comment from "./Comment";

interface IProps {
  slug: string;
  currentUsername: string;
}

async function CommentList({ slug, currentUsername }: IProps) {
  const { comments } = await commentsApi.getComments(slug);

  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} currentUsername={currentUsername} slug={slug} />
      ))}
    </div>
  );
}

export default CommentList;
