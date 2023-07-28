/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ILoginBody, IAuthError, IRegisterBody } from "@/types";
import { authApi } from "@/api/domain/auth";
import { setToken } from "@/app/action";

function useAuth() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const signup = async (registerData: IRegisterBody["user"]) => {
    try {
      const newUser = await authApi.signup(registerData);
      return newUser;
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (loginData: ILoginBody["user"]) => {
    try {
      const user = await authApi.login(loginData);
      await setToken(user.token);
      router.refresh();
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
