import { articleApi } from "@/axios/domain/article";
import EditorForm from "@/components/Editor/EditorForm/EditorForm";

interface IProps {
  params: {
    slug?: string;
  };
}

async function EditorPage({ params }: IProps) {
  const article = params.slug ? await articleApi.getArticleDetails(params.slug) : undefined;

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <EditorForm initialArticle={article} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
