interface IProps {
  isFollowing: boolean;
  username: string;
}

function FollowButton({ isFollowing, username }: IProps) {
  return (
    <button className="btn btn-sm btn-outline-secondary action-btn">
      <i className="ion-plus-round" />
      &nbsp; {`${isFollowing ? "Unfollow" : "Follow"}`} {username}
    </button>
  );
}

export default FollowButton;
