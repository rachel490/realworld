/* eslint-disable import/no-cycle */
import { realWorldApi } from "@/api/axios";
import { API_URI } from "@/api/apiURI";
import { IFeedResponse } from "@/types/api";
import Banner from "@/components/Banner/Banner";
import FeedNavbar from "@/components/FeedNavbar/FeedNavbar";
import TagSide from "@/components/Tag/TagSide";
import ArticleCard from "@/components/Article/ArticleCard";

async function getData() {
  const res = await realWorldApi.get<IFeedResponse>(API_URI.article.get.GLOBAL_FEED());

  return res.data;
}

export default async function Home() {
  const { articles } = await getData();
  const feedList = ["Global Feed"];

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedNavbar feedList={feedList} currentFeed={feedList[0]} />
            {articles.map(article => (
              <ArticleCard key={article.slug} articleData={article} />
            ))}
          </div>
          <TagSide />
        </div>
      </div>
    </div>
  );
}
