"use client";

import { useState, useTransition } from "react";
import { ILoginBody } from "@/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PAGE_LINKS } from "@/constants/links";
import ButtonSpinner from "@/components/@Shared/Spinner/ButtonSpinner";

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
  const router = useRouter();
  const [loginData, setLoginData] = useState<ILoginBody["user"]>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const { value } = e.target;

    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const response = await signIn("nextauth-credential", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      });
      if (response?.error) {
        const errorObject = JSON.parse(response?.error) as string[];
        setErrorMessage(errorObject);
      } else {
        router.refresh();
        router.push(PAGE_LINKS.home);
      }
    });
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
        <button className="btn btn-lg btn-primary pull-xs-right" disabled={isPending}>
          {isPending && <ButtonSpinner />}Sign in
        </button>
      </form>
    </>
  );
}

export default LoginForm;
