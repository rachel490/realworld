"use client";

import { useState } from "react";
import useSignup from "@/hooks/useSignup";
import { IRegisterBody } from "@/types/api";

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
  const [registerData, setRegisterData] = useState<IRegisterBody>(initialData);
  const { signup, errorMessage } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setRegisterData(prev => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(registerData);
  };

  return (
    <>
      {errorMessage.length && (
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
        <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
      </form>
    </>
  );
}

export default RegisterForm;
