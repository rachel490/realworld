import { articleApi } from "@/api/domain/article";
import { authApi } from "@/api/domain/auth";
import TagList from "@/components/Tag/TagList";
import CommentList from "@/components/@Shared/Comment/CommentList";
import ArticleMeta from "@/components/Article/ArticleMeta";
import CommentForm from "@/components/Comment/CommentForm/CommentForm";

interface IProps {
  params: {
    slug: string;
  };
}

async function ArticlePage({ params }: IProps) {
  const { article } = await articleApi.getArticleDetails(params.slug);
  const {
    title,
    body,
    tagList,
    slug,
    author: { username },
  } = article;

  const currentUser = await authApi.currentUser();
  const isAuthorCurrentUser = currentUser.username === username;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          <ArticleMeta article={article} isAuthorCurrentUser={isAuthorCurrentUser} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div>
              <p>{body}</p>
            </div>
            <TagList tags={tagList} type="outline" />
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} isAuthorCurrentUser={isAuthorCurrentUser} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentForm slug={slug} />
            <CommentList slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
