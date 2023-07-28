/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { IUser, IUserSettingsBody } from "@/types";
import { authApi } from "@/axios/domain/auth";
import { PAGE_LINKS } from "@/constants/links";
import { useSession } from "next-auth/react";
import { IInput } from "../Auth/Login/LoginForm";
import ButtonSpinner from "../@Shared/Spinner/ButtonSpinner";

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
  const { data, update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [settingsData, setSettingsData] = useState<IUserSettingsBody["user"]>({
    image: currentUser.image,
    bio: currentUser.bio,
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });

  if (!data || !data.user) {
    router.push(PAGE_LINKS.register);
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
  ) => {
    const { value } = e.target;
    setSettingsData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const updatedUser = await authApi.updateUser({ user: settingsData });
      await updateSession(updatedUser);
      router.refresh();
      router.push(PAGE_LINKS.profilePosts(currentUser.username));
    });
  };

  const updateSession = async (updatedUser: IUser) => {
    const newSession = {
      ...data,
      user: {
        ...data.user,
        ...updatedUser,
      },
    };

    update(newSession);
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
        <button type="submit" className="btn btn-lg btn-primary pull-xs-right" disabled={isPending}>
          {isPending && <ButtonSpinner />}Update Settings
        </button>
      </fieldset>
    </form>
  );
}

export default SettingsForm;
