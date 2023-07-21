import { IArticle } from "@/types/api";
import ArticleCard from "./ArticleCard";

interface IProps {
  articlesData: IArticle[];
}

function ArticleList({ articlesData }: IProps) {
  return (
    <div>
      {articlesData.length ? (
        <>
          {articlesData.map(article => (
            <ArticleCard articleData={article} key={article.slug} />
          ))}
        </>
      ) : (
        <div className="article-preview">No articles are here... yet.</div>
      )}
    </div>
  );
}

export default ArticleList;
