import Image from "next/image";
import { realWorldApi } from "@/api/axios";
import { API_URI } from "@/api/apiURI";
import { IProfileResponse } from "@/types";

const fetchUserData = async (username: string) => {
  const res = await realWorldApi.get<IProfileResponse>(API_URI.profile.get.USER_PROFILE(username));
  return res.data.profile;
};

interface IProps {
  username: string;
}

async function ProfileHero({ username }: IProps) {
  const userData = await fetchUserData(username);
  const { username: name, bio, image, following } = userData;

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
