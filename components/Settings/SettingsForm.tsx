/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IUser, IUserSettingsBody } from "@/types";
import { authApi } from "@/api/domain/auth";
import { PAGE_LINKS } from "@/constants/links";
import { IInput } from "../Login/LoginForm";

const settingsInputs: IInput[] = [
  {
    type: "url",
    placeholder: "URL of profile picture",
    name: "image",
  },
  {
    type: "text",
    placeholder: "Your Name",
    name: "username",
  },
  {
    type: "textarea",
    placeholder: "Short bio about you",
    name: "bio",
  },
  {
    type: "email",
    placeholder: "Email",
    name: "email",
  },
  {
    type: "password",
    placeholder: "New Password",
    name: "password",
  },
];

interface IProps {
  currentUser: IUser;
}

function SettingsForm({ currentUser }: IProps) {
  const router = useRouter();

  const [settingsData, setSettingsData] = useState<IUserSettingsBody["user"]>({
    image: currentUser.image,
    bio: currentUser.bio,
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
  ) => {
    const { value } = e.target;
    setSettingsData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authApi.updateUser({ user: settingsData });
    router.refresh();
    router.push(PAGE_LINKS.profilePosts(currentUser.username));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        {settingsInputs.map(input => (
          <fieldset key={input.name} className="form-group">
            {input.type === "textarea" ? (
              <textarea
                className="form-control form-control-lg"
                rows={8}
                placeholder={input.placeholder}
                onChange={e => handleChange(e, input.name)}
                value={settingsData[input.name] || ""}
              />
            ) : (
              <input
                className="form-control"
                type={input.type}
                placeholder={input.placeholder}
                onChange={e => handleChange(e, input.name)}
                value={settingsData[input.name] || ""}
              />
            )}
          </fieldset>
        ))}
        <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
          Update Settings
        </button>
      </fieldset>
    </form>
  );
}

export default SettingsForm;
