import { realWorldApi } from "@/api/axios";
import { API_URI } from "@/api/apiURI";
import { ITrendingTagsResponse } from "@/types";
import TagList from "./TagList";

async function getTagData() {
  const res = await realWorldApi.get<ITrendingTagsResponse>(API_URI.tag.get.TRENDING_TAG);
  return res.data;
}

async function TagSide() {
  const { tags } = await getTagData();

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          <TagList tags={tags} />
        </div>
      </div>
    </div>
  );
}

export default TagSide;
