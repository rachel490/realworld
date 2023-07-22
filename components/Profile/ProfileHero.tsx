import Image from "next/image";
import { profileApi } from "@/api/domain/profile";

interface IProps {
  username: string;
}

async function ProfileHero({ username }: IProps) {
  const { profile } = await profileApi.getProfile(username);
  const { username: name, bio, image, following } = profile;

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <Image src={image} className="user-img" alt="user profile" width={100} height={100} />
            <h4>{name}</h4>
            <p>{bio}</p>
            <button className="btn btn-sm btn-outline-secondary action-btn">
              <i className="ion-plus-round" />
              &nbsp; {following ? "Unfollow" : "Follow"} {name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHero;
