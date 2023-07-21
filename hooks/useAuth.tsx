/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { realWorldApi } from "@/api/axios";
import { API_URI } from "@/api/apiURI";
import { ILoginBody, IAuthError, IRegisterBody, IUserResponse } from "@/types/api";

function useAuth() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const generatePayloadData = (data: IRegisterBody | ILoginBody) => {
    return {
      user: data,
    };
  };

  const signup = async (registerData: IRegisterBody) => {
    try {
      const response = await realWorldApi.post<IUserResponse>(
        API_URI.auth.post.SIGN_UP,
        generatePayloadData(registerData),
      );

      localStorage.setItem("jwt", response.data.user.token);
      router.push("/");
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (loginData: ILoginBody) => {
    try {
      const response = await realWorldApi.post<IUserResponse>(
        API_URI.auth.post.LOGIN,
        generatePayloadData(loginData),
      );

      localStorage.setItem("jwt", response.data.user.token);
      router.push("/");
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    if (axios.isAxiosError<IAuthError>(error)) {
      if (error.response?.data.errors) {
        const errors = Object.entries(error.response.data.errors).map(
          ([key, value]) => `${key} ${value[0]}`,
        );
        return setErrorMessage([...errors]);
      }

      return setErrorMessage([error.message]);
    }

    return setErrorMessage(["An unexpected error occurred"]);
  };

  return { login, signup, errorMessage };
}

export default useAuth;
