/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { articleApi } from "@/axios/domain/article";
import { IArticle, IArticleBody, IArticleItemResponse } from "@/types";
import { PAGE_LINKS } from "@/constants/links";
import { handleError } from "@/utils/service";
import ButtonSpinner from "@/components/@Shared/Spinner/ButtonSpinner";

const articleInputs = [
  { name: "title", placeholder: "Article Title", type: "text", isRequired: true },
  {
    name: "description",
    placeholder: "What's this article about?",
    type: "text",
  },
  {
    name: "body",
    placeholder: "Write your article (in markdown)",
    type: "textarea",
  },
];

const generateInitialValue = (article?: IArticle) => {
  return {
    title: article?.title || "",
    description: article?.description || "",
    body: article?.body || "",
    tagList: article?.tagList || [],
  };
};

interface IProps {
  initialArticle?: IArticleItemResponse;
}

function EditorForm({ initialArticle }: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [articleData, setArticleData] = useState<IArticleBody["article"]>(
    generateInitialValue(initialArticle?.article),
  );
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
  ) => {
    if (name === "tagList") return;
    setArticleData(prev => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const { article } = initialArticle
          ? await articleApi.updateArticle(initialArticle.article.slug, { article: articleData })
          : await articleApi.postArticle({ article: articleData });
        router.refresh();
        router.push(PAGE_LINKS.article(article.slug));
      } catch (error) {
        const currentError = handleError(error);
        setErrorMessage(currentError);
      }
    });
  };

  const handleCurrentTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (currentTag && !articleData.tagList.includes(currentTag)) {
      setArticleData(prev => ({ ...prev, tagList: [...prev.tagList, currentTag] }));
    }
    setCurrentTag("");
    e.preventDefault();
  };

  const deleteTag = (tagName: string) => {
    const filteredList = articleData.tagList.filter(tag => tag !== tagName);
    setArticleData(prev => ({ ...prev, tagList: filteredList }));
  };

  return (
    <>
      {!!errorMessage.length && (
        <ul className="error-messages">
          <li>{errorMessage}</li>
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset>
          {articleInputs.map(input => (
            <fieldset key={input.name} className="form-group">
              {input.type === "textarea" ? (
                <textarea
                  className="form-control"
                  rows={8}
                  placeholder={input.placeholder}
                  value={articleData[input.name]}
                  onChange={e => handleChange(e, input.name)}
                />
              ) : (
                <input
                  value={articleData[input.name]}
                  onChange={e => handleChange(e, input.name)}
                  type={input.type}
                  className="form-control form-control-lg"
                  placeholder={input.placeholder}
                />
              )}
            </fieldset>
          ))}
          <fieldset className="form-group">
            <input
              value={currentTag}
              onChange={handleCurrentTag}
              onKeyDown={addTag}
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter tags"
            />
            <div className="tag-list">
              {articleData.tagList.map(tag => (
                <span key={tag} className="tag-default tag-pill ng-binding ng-scope">
                  <button type="button" onClick={() => deleteTag(tag)}>
                    <i className="ion-close-round" />
                  </button>
                  {tag}
                </span>
              ))}
            </div>
          </fieldset>
          <button
            className="btn btn-lg pull-xs-right btn-primary"
            type="submit"
            disabled={isPending}
          >
            {isPending && <ButtonSpinner />}Publish Article
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default EditorForm;
