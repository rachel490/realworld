import axios from "axios";
import { authApi } from "@/api/domain/auth";
import { IAuthError, ILoginBody, IRegisterBody } from "@/types";

export async function login(loginData: ILoginBody["user"]) {
  try {
    const user = await authApi.login(loginData);
    return { success: true, user };
  } catch (error) {
    const errorMessage = handleError(error);
    return { success: false, error: errorMessage };
  }
}

export async function signup(registerData: IRegisterBody["user"]) {
  try {
    const newUser = await authApi.signup(registerData);
    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, error };
  }
}

const handleError = (error: any) => {
  if (axios.isAxiosError<IAuthError>(error)) {
    if (error.response?.data.errors) {
      const errors = Object.entries(error.response.data.errors).map(
        ([key, value]) => `${key} ${value[0]}`,
      );
      return [...errors];
    }

    return [error.message];
  }

  return ["An unexpected error occurred"];
};
