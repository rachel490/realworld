/* eslint-disable import/no-cycle */
import { getServerComponentPathname } from "@/utils/serverActions";
import Banner from "@/components/Banner/Banner";
import FeedNavbar from "@/components/FeedNavbar/FeedNavbar";
import Pagination from "@/components/Pagination/Pagination";
import TagSide from "@/components/Tag/TagSide";
import ArticleList from "@/components/Article/ArticleList";
import { articleApi } from "@/api/domain/article";

export interface IMainPageProps {
  searchParams: {
    tagName: string;
    feed: "tag" | "my";
    page: number;
  };
}

const LIMIT = 10;

export default async function Home({ searchParams }: IMainPageProps) {
  const { articles, articlesCount } = await articleApi.getGlobalFeed(
    searchParams.tagName,
    searchParams.page,
  );
  const totalPages = Math.ceil(articlesCount / LIMIT);

  // NOTE: generate feedList
  const feedList = ["Global Feed"];
  if (searchParams.feed === "tag" && searchParams.tagName) {
    feedList.push(searchParams.tagName);
  }

  const getCurrentFeed = () => {
    const { tagName, feed } = searchParams;
    if (feed === "tag" && tagName.length) return tagName;
    if (feed === "my") return "Your Feed";
    return "Global Feed";
  };

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedNavbar feedList={feedList} currentFeed={getCurrentFeed()} />
            <ArticleList articlesData={articles} />
            <Pagination
              totalPages={totalPages}
              searchParams={searchParams}
              currentURL={getServerComponentPathname()}
            />
          </div>
          <TagSide />
        </div>
      </div>
    </div>
  );
}
