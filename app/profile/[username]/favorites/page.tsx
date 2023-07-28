import { Suspense } from "react";
import ArticleList from "@/components/Article/ArticleList";
import ProfileTabMenu from "@/components/Profile/ProfileTabMenu";
import Spinner from "@/components/@Shared/Spinner/Spinner";

interface IProps {
  params: {
    username: string;
  };
}

function UserFavoritedArticlePage({ params }: IProps) {
  return (
    <div>
      <ProfileTabMenu username={params.username} currentTab="Favorited Articles" />
      <Suspense fallback={<Spinner />}>
        <ArticleList params={params} type="user liked" />
      </Suspense>
    </div>
  );
}

export default UserFavoritedArticlePage;
