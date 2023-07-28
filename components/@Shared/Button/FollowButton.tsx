/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { profileApi } from "@/api/domain/profile";
import { PAGE_LINKS } from "@/constants/links";
import { useSession } from "next-auth/react";

interface IProps {
  isFollowing: boolean;
  username: string;
}

function FollowButton({ isFollowing, username }: IProps) {
  const router = useRouter();
  const session = useSession();
  const [following, setFollowing] = useState(isFollowing);

  const handleClick = async () => {
    if (!session || session.status === "unauthenticated") {
      router.push(PAGE_LINKS.register);
      return;
    }

    if (following) {
      const { profile } = await profileApi.unfollowUser(username);
      setFollowing(profile.following);
      router.refresh();
    } else {
      const { profile } = await profileApi.followUser(username);
      setFollowing(profile.following);
      router.refresh();
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
