import { articleApi } from "@/api/domain/article";
import ArticleList from "@/components/Article/ArticleList";
import ProfileTabMenu from "@/components/Profile/ProfileTabMenu";

interface IProps {
  params: {
    username: string;
  };
}

async function ProfilePage({ params }: IProps) {
  const { articles } = await articleApi.getUserPostedArticles(params.username);

  return (
    <>
      <ProfileTabMenu username={params.username} currentTab="My Articles" />
      <ArticleList articlesData={articles} />
    </>
  );
}

export default ProfilePage;
