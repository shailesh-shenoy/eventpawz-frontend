import { authService } from "@/utilities";
import Cookies from "js-cookie";
import { AuthResponse } from "@/types/types";

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    console.log("UseLogin", username, password);
    const user = await authService.login(username, password);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user as AuthResponse;
  };

  return { login };
};
