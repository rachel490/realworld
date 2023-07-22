import { realWorldApi } from "@/api/axios";
import { API_URI } from "@/api/apiURI";
import { IFeedResponse } from "@/types/api";
import ArticleList from "@/components/Article/ArticleList";
import ProfileTabMenu from "@/components/Profile/ProfileTabMenu";

interface IProps {
  params: {
    username: string;
  };
}

const getUserFavoritedData = async (username: string) => {
  const res = await realWorldApi.get<IFeedResponse>(
    API_URI.article.get.USER_FAVORITED_ARTICLES(username),
  );

  return res.data;
};

async function page({ params }: IProps) {
  const { articles } = await getUserFavoritedData(params.username);

  return (
    <div>
      <ProfileTabMenu username={params.username} currentTab="Favorited Articles" />
      <ArticleList articlesData={articles} />
    </div>
  );
}

export default page;
