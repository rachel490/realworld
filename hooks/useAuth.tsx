/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ILoginBody, IRegisterBody } from "@/types";
import { authApi } from "@/api/domain/auth";
import { setToken } from "@/app/action";
import { handleError } from "@/utils/service";

function useAuth() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const signup = async (registerData: IRegisterBody["user"]) => {
    try {
      const newUser = await authApi.signup(registerData);
      return newUser;
    } catch (error) {
      const currentError = handleError(error);
      setErrorMessage(currentError);
    }
  };

  const login = async (loginData: ILoginBody["user"]) => {
    try {
      const user = await authApi.login(loginData);
      await setToken(user.token);
      router.refresh();
      router.push("/");
    } catch (error) {
      const currentError = handleError(error);
      setErrorMessage(currentError);
    }
  };

  return { login, signup, errorMessage };
}

export default useAuth;
