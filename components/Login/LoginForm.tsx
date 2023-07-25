"use client";

import { useState } from "react";
import { ILoginBody } from "@/types";
import useAuth from "@/hooks/useAuth";

export interface IInput {
  type: string;
  placeholder: string;
  name: string;
}

const loginInputs: IInput[] = [
  {
    type: "email",
    placeholder: "Email",
    name: "email",
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];

const initialValue = {
  email: "",
  password: "",
};

function LoginForm() {
  const [loginData, setLoginData] = useState<ILoginBody["user"]>(initialValue);
  const { login, errorMessage } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { value } = e.target;

    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(loginData);
  };

  return (
    <>
      {!!errorMessage.length && (
        <ul className="error-messages">
          <li>{errorMessage}</li>
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        {loginInputs.map(input => (
          <fieldset className="form-group" key={input.placeholder}>
            <input
              className="form-control form-control-lg"
              type={input.type}
              placeholder={input.placeholder}
              onChange={e => handleChange(e, input.name)}
              value={loginData[input.name]}
            />
          </fieldset>
        ))}
        <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
      </form>
    </>
  );
}

export default LoginForm;
