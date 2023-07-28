"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { IRegisterBody } from "@/types";
import useAuth from "@/hooks/useAuth";
import { PAGE_LINKS } from "@/constants/links";
import ButtonSpinner from "@/components/@Shared/Spinner/ButtonSpinner";

const registerInputs = [
  {
    type: "text",
    placeholder: "Your Name",
    name: "username",
  },
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

const initialData = {
  username: "",
  email: "",
  password: "",
};

function RegisterForm() {
  const router = useRouter();
  const [registerData, setRegisterData] = useState<IRegisterBody["user"]>(initialData);
  const [isPending, startTransition] = useTransition();
  const { signup, errorMessage } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setRegisterData(prev => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const user = await signup(registerData);
      if (!user) return;

      await signIn("nextauth-credential", {
        email: registerData.email,
        password: registerData.password,
        redirect: false,
      });

      router.refresh();
      router.push(PAGE_LINKS.home);
    });
  };

  return (
    <>
      {!!errorMessage.length && (
        <ul className="error-messages">
          {errorMessage.map(message => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        {registerInputs.map(input => (
          <fieldset key={input.name} className="form-group">
            <input
              className="form-control form-control-lg"
              type={input.type}
              placeholder={input.placeholder}
              value={registerData[input.name]}
              onChange={e => handleChange(e, input.name)}
            />
          </fieldset>
        ))}
        <button className="btn btn-lg btn-primary pull-xs-right" disabled={isPending}>
          {isPending && <ButtonSpinner />}Sign up
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
