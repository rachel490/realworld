import { commentsApi } from "@/api/domain/comment";
import Comment from "./Comment";

interface IProps {
  slug: string;
}

async function CommentList({ slug }: IProps) {
  const { comments } = await commentsApi.getComments(slug);

  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
