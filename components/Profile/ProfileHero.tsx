import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { profileApi } from "@/api/domain/profile";
import { PAGE_LINKS } from "@/constants/links";
import { nextAuthOptions } from "@/lib/nextAuth";
import FollowButton from "../@Shared/Button/FollowButton";

interface IProps {
  username: string;
}

async function ProfileHero({ username }: IProps) {
  const session = await getServerSession(nextAuthOptions);
  const { profile } = await profileApi.getProfile(username);
  const { username: name, bio, image, following } = profile;

  const isAuthorCurrentUser = session?.user.username === username;

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
