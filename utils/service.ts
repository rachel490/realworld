import axios from "axios";
import { ICustomError } from "@/types";

export const handleError = (error: any) => {
  if (axios.isAxiosError<ICustomError>(error)) {
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
