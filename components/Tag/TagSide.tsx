import { tagApi } from "@/api/domain/tag";
import TagList from "./TagList";

async function TagSide() {
  const { tags } = await tagApi.getTrendingTags();

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
