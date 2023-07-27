/* eslint-disable import/no-cycle */
import { getServerSession } from "next-auth";
import { articleApi } from "@/api/domain/article";
import { nextAuthOptions } from "@/lib/nextAuth";
import { getServerComponentPathname } from "@/utils/serverActions";
import Banner from "@/components/Home/Banner";
import FeedNavbar from "@/components/Home/FeedNavbar";
import Pagination from "@/components/Home/Pagination";
import TagSide from "@/components/Home/Tag/TagSide";
import ArticleList from "@/components/Article/ArticleList";

export interface IMainPageProps {
  searchParams: {
    tagName: string;
    feed: "tag" | "my";
    page: number;
  };
}

const LIMIT = 10;

export default async function Home({ searchParams }: IMainPageProps) {
  const session = await getServerSession(nextAuthOptions);
  const { articles, articlesCount } =
    searchParams.feed === "my"
      ? await articleApi.getMyFeed(searchParams.page)
      : await articleApi.getGlobalFeed(searchParams.tagName, searchParams.page);

  const totalPages = Math.ceil(articlesCount / LIMIT);

  // NOTE: generate feedList
  const feedList = ["Global Feed"];
  if (session) {
    feedList.push("Your Feed");
  }
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
