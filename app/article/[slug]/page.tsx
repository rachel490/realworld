import Link from "next/link";
import { getServerSession } from "next-auth";
import Markdown from "marked-react";
import { articleApi } from "@/api/domain/article";
import { nextAuthOptions } from "@/lib/nextAuth";
import { PAGE_LINKS } from "@/constants/links";
import TagList from "@/components/Home/Tag/TagList";
import CommentList from "@/components/Article/Comment/CommentList";
import ArticleMeta from "@/components/Article/ArticleMeta";
import CommentForm from "@/components/Article/Comment/CommentForm";

interface IProps {
  params: {
    slug: string;
  };
}

async function ArticlePage({ params }: IProps) {
  const { article } = await articleApi.getArticleDetails(params.slug);
  const { title, body, tagList, slug } = article;

  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div>
              <Markdown>{body}</Markdown>
            </div>
            <TagList tags={tagList} type="outline" />
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            {session ? (
              <CommentForm slug={slug} />
            ) : (
              <p>
                <Link href={PAGE_LINKS.login}>Sign in</Link>&nbsp;or&nbsp;
                <Link href={PAGE_LINKS.register}>Sign up</Link> to add comments on this article.
              </p>
            )}
            <CommentList slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
