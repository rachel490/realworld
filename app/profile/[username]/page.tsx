import { realWorldApi } from "@/api/axios";
import { API_URI } from "@/api/apiURI";
import { IArticleListResponse } from "@/types";
import ArticleList from "@/components/Article/ArticleList";
import ProfileTabMenu from "@/components/Profile/ProfileTabMenu";

interface IProps {
  params: {
    username: string;
  };
}

const getUserArticlesData = async (username: string) => {
  const res = await realWorldApi.get<IArticleListResponse>(
    API_URI.article.get.USER_POSTED_ARTICLES(username),
  );

  return res.data;
};

async function ProfilePage({ params }: IProps) {
  const { articles } = await getUserArticlesData(params.username);

  return (
    <>
      <ProfileTabMenu username={params.username} currentTab="My Articles" />
      <ArticleList articlesData={articles} />
    </>
  );
}

export default ProfilePage;
