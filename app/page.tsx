/* eslint-disable import/no-cycle */
import { realWorldApi } from "@/api/axios";
import { API_URI } from "@/api/apiURI";
import { IFeedResponse } from "@/types/api";
import Banner from "@/components/Banner/Banner";
import FeedNavbar from "@/components/FeedNavbar/FeedNavbar";
import TagSide from "@/components/Tag/TagSide";
import ArticleCard from "@/components/Article/ArticleCard";

async function getData(tagName?: string) {
  const res = await realWorldApi.get<IFeedResponse>(API_URI.article.get.GLOBAL_FEED(tagName));

  return res.data;
}

export interface IMainPageProps {
  searchParams: {
    tagName: string;
    feed: "tag";
  };
}

export default async function Home({ searchParams }: IMainPageProps) {
  const { articles } = await getData(searchParams.tagName);

  // NOTE: generate feedList
  const feedList = ["Global Feed"];
  if (searchParams.feed === "tag" && searchParams.tagName) {
    feedList.push(searchParams.tagName);
  }

  const getCurrentFeed = () => {
    const { tagName, feed } = searchParams;
    console.log("tagname", tagName, feed);
    if (feed === "tag" && tagName.length) return tagName;
    return "Global Feed";
  };

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedNavbar feedList={feedList} currentFeed={getCurrentFeed()} />
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
