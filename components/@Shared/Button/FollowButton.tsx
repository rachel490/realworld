/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { profileApi } from "@/api/domain/profile";
import { checkIsLoggedIn } from "@/utils/token";
import { PAGE_LINKS } from "@/constants/links";

interface IProps {
  isFollowing: boolean;
  username: string;
}

function FollowButton({ isFollowing, username }: IProps) {
  const router = useRouter();
  const [following, setFollowing] = useState(isFollowing);

  const handleClick = async () => {
    const loggedIn = await checkIsLoggedIn();
    if (!loggedIn) {
      router.push(PAGE_LINKS.register);
      return;
    }

    if (following) {
      const { profile } = await profileApi.unfollowUser(username);
      setFollowing(profile.following);
    } else {
      const { profile } = await profileApi.followUser(username);
      setFollowing(profile.following);
    }
  };

  return (
    <button
      className={`btn btn-sm ${following ? "btn-secondary" : "btn-outline-secondary"} action-btn`}
      onClick={handleClick}
    >
      <i className="ion-plus-round" />
      &nbsp; {`${following ? "Unfollow" : "Follow"}`} {username}
    </button>
  );
}

export default FollowButton;
