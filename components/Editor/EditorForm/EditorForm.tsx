/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { articleApi } from "@/api/domain/article";
import { IArticle, IArticleBody, IArticleItemResponse } from "@/types";
import { PAGE_LINKS } from "@/constants/links";

const articleInputs = [
  { name: "title", placeholder: "Article Title", type: "text", isRequired: true },
  {
    name: "description",
    placeholder: "What's this article about?",
    type: "text",
    isRequired: true,
  },
  {
    name: "body",
    placeholder: "Write your article (in markdown)",
    type: "textarea",
    isRequired: true,
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

  const [articleData, setArticleData] = useState<IArticleBody["article"]>(
    generateInitialValue(initialArticle?.article),
  );
  const [currentTag, setCurrentTag] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
  ) => {
    if (name === "tagList") return;
    setArticleData(prev => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { article } = initialArticle
      ? await articleApi.updateArticle(initialArticle.article.slug, { article: articleData })
      : await articleApi.postArticle({ article: articleData });
    router.refresh();
    router.push(PAGE_LINKS.article(article.slug));
  };

  const handleCurrentTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    setArticleData(prev => ({ ...prev, tagList: [...prev.tagList, currentTag] }));
    setCurrentTag("");
  };

  const deleteTag = (tagName: string) => {
    const filteredList = articleData.tagList.filter(tag => tag !== tagName);
    setArticleData(prev => ({ ...prev, tagList: filteredList }));
  };

  return (
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
                required={input.isRequired}
              />
            ) : (
              <input
                value={articleData[input.name]}
                onChange={e => handleChange(e, input.name)}
                type={input.type}
                className="form-control form-control-lg"
                placeholder={input.placeholder}
                required={input.isRequired}
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
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
          Publish Article
        </button>
      </fieldset>
    </form>
  );
}

export default EditorForm;
