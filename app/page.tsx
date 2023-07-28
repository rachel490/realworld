/* eslint-disable import/no-cycle */
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuth";
import Banner from "@/components/Home/Banner";
import FeedNavbar from "@/components/Home/FeedNavbar";
import TagSide from "@/components/Home/Tag/TagSide";
import ArticleList from "@/components/Article/ArticleList";
import Spinner from "@/components/@Shared/Spinner/Spinner";

export interface IMainPageProps {
  searchParams: {
    tagName: string;
    feed: "tag" | "my";
    page: number;
  };
}

export default async function Home({ searchParams }: IMainPageProps) {
  const session = await getServerSession(nextAuthOptions);

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
            <Suspense fallback={<Spinner />}>
              <ArticleList
                searchParams={searchParams}
                type={searchParams.feed === "my" ? "my feed" : "global feed"}
              />
            </Suspense>
          </div>
          <TagSide />
        </div>
      </div>
    </div>
  );
}
