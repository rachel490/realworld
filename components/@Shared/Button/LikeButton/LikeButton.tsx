interface IProps {
  favoritesCount: number;
  isFavorited: boolean;
  slug: string;
}

function LikeButton({ favoritesCount, isFavorited, slug }: IProps) {
  return (
    <button className="btn btn-sm btn-outline-primary">
      <i className="ion-heart" />
      &nbsp; ${isFavorited ? "Unfavorite" : "Favorite"} Article
      <span className="counter">{`(${favoritesCount})`}</span>
    </button>
  );
}

export default LikeButton;
