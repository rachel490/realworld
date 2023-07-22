"use client";

import { useState } from "react";
import { ISettingsBody } from "@/types/api";
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

const initialValue = {
  image: "",
  username: "",
  bio: "",
  email: "",
  password: "",
};

function SettingsForm() {
  const [settingsData, setSettingsData] = useState<ISettingsBody>(initialValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
  ) => {
    const { value } = e.target;
    setSettingsData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("settings data", settingsData);
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
                value={settingsData[input.name]}
              />
            ) : (
              <input
                className="form-control"
                type={input.type}
                placeholder={input.placeholder}
                onChange={e => handleChange(e, input.name)}
                value={settingsData[input.name]}
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
