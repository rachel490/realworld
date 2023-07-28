import { authApi } from "@/axios/domain/auth";
import { ILoginBody, IRegisterBody } from "@/types";
import { handleError } from "./service";

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
