import Image from "next/image";
import Link from "next/link";
import { profileApi } from "@/api/domain/profile";
import { authApi } from "@/api/domain/auth";
import { PAGE_LINKS } from "@/constants/links";
import { checkIsLoggedIn } from "@/utils/token";
import FollowButton from "../@Shared/Button/FollowButton/FollowButton";

interface IProps {
  username: string;
}

async function ProfileHero({ username }: IProps) {
  const { profile } = await profileApi.getProfile(username);
  const { username: name, bio, image, following } = profile;

  const isLoggedIn = await checkIsLoggedIn();
  let isAuthorCurrentUser = false;

  if (isLoggedIn) {
    const currentUser = await authApi.currentUser();
    isAuthorCurrentUser = currentUser.username === name;
  }

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <Image src={image} className="user-img" alt="user profile" width={100} height={100} />
            <h4>{name}</h4>
            <p>{bio}</p>
            {isAuthorCurrentUser ? (
              <Link
                className="btn btn-sm btn-outline-secondary action-btn"
                href={PAGE_LINKS.settings}
              >
                <i className="ion-gear-a" /> Edit Profile Settings
              </Link>
            ) : (
              <FollowButton isFollowing={following} username={name} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHero;
