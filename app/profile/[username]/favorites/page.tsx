import { articleApi } from "@/api/domain/article";
import ArticleList from "@/components/Article/ArticleList";
import ProfileTabMenu from "@/components/Profile/ProfileTabMenu";

interface IProps {
  params: {
    username: string;
  };
}

async function page({ params }: IProps) {
  const { articles } = await articleApi.getUserFavoritedArticles(params.username);

  return (
    <div>
      <ProfileTabMenu username={params.username} currentTab="Favorited Articles" />
      <ArticleList articlesData={articles} />
    </div>
  );
}

export default page;
