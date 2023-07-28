import { articleApi } from "@/api/domain/article";
import { IMainPageProps } from "@/app/page";
import { getServerComponentPathname } from "@/utils/serverActions";
import ArticleCard from "./ArticleCard";
import Pagination from "../Home/Pagination";

type IProps = {
  type: "global feed" | "my feed" | "user post" | "user liked";
  searchParams?: IMainPageProps["searchParams"];
  params?: {
    username: string;
  };
};

const LIMIT = 10;

const getArticlesData = (
  type: IProps["type"],
  searchParams?: IProps["searchParams"],
  params?: IProps["params"],
) => {
  switch (type) {
    case "global feed":
      return articleApi.getGlobalFeed(searchParams?.tagName, searchParams?.page);
    case "my feed":
      return articleApi.getMyFeed(searchParams?.page);
    case "user post":
      return articleApi.getUserPostedArticles(params?.username as string);
    case "user liked":
      return articleApi.getUserFavoritedArticles(params?.username as string);
    default:
      return { articles: [], articlesCount: 0 };
  }
};

async function ArticleList({ searchParams, type, params }: IProps) {
  const { articles, articlesCount } = await getArticlesData(type, searchParams, params);

  const totalPages = Math.ceil(articlesCount / LIMIT);

  return (
    <>
      <div>
        {articles.length ? (
          articles.map(article => <ArticleCard articleData={article} key={article.slug} />)
        ) : (
          <div className="article-preview">No articles are here... yet.</div>
        )}
      </div>
      {["my feed", "global feed"].includes(type) && (
        <Pagination
          totalPages={totalPages}
          searchParams={searchParams}
          currentURL={getServerComponentPathname()}
        />
      )}
    </>
  );
}

export default ArticleList;
