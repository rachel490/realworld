/* eslint-disable consistent-return */
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { realWorldApi } from "@/api/axios";
import { API_URI } from "@/api/apiURI";
import { IAuthError, IRegisterBody, IUserResponse } from "@/types/api";

function useSignup() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const signup = async (registerData: IRegisterBody) => {
    const data = {
      user: registerData,
    };

    try {
      const response = await realWorldApi.post<IUserResponse>(API_URI.auth.post.SIGN_UP, data);
      console.log("signup success :", response.data);

      localStorage.setItem("jwt", response.data.user.token);
      router.push("/");
    } catch (error) {
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
    }
  };

  return { signup, errorMessage };
}

export default useSignup;
