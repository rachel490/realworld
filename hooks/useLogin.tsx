/* eslint-disable consistent-return */
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { realWorldApi } from "@/api/axios";
import { API_URI } from "@/api/apiURI";
import { ILoginBody, IAuthError, IUserResponse } from "@/types/api";

function useLogin() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (loginData: ILoginBody) => {
    const data = {
      user: loginData,
    };

    try {
      const response = await realWorldApi.post<IUserResponse>(API_URI.auth.post.LOGIN, data);
      console.log("login success :", response.data);

      localStorage.setItem("jwt", response.data.user.token);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError<IAuthError>(error)) {
        const loginError = error.response?.data.errors;

        if (loginError) {
          const errorKey = Object.entries(loginError)[0][0];
          const errorValue = Object.entries(loginError)[0][1][0];
          return setErrorMessage(`${errorKey} ${errorValue}`);
        }

        return setErrorMessage(error.message);
      }

      return setErrorMessage("An unexpected error occurred");
    }
  };

  return { login, errorMessage };
}

export default useLogin;
