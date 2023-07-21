import Link from "next/link";
import { realWorldApi } from "@/api/axios";
import { ITrendingTagsResponse } from "@/types/api";
import { API_URI } from "@/api/apiURI";

async function getTagData() {
  const res = await realWorldApi.get<ITrendingTagsResponse>(API_URI.tag.get.TRENDING_TAG);
  return res.data.tags;
}

async function TagSide() {
  const tagList = await getTagData();

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {tagList.map(tag => (
            <Link
              href={{ pathname: "/", query: { feed: "tag", tagName: tag } }}
              key={tag}
              className="tag-pill tag-default"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagSide;
