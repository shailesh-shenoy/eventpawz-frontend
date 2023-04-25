import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AppUser, AuthResponse } from "@/types/types";
import { authService } from "@/utilities";

export const useCurrentUser = () => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      const authInfo = JSON.parse(currentUser) as AuthResponse;
      setUser(authInfo);
      if (authInfo?.id) {
        authService.getMe(authInfo.id).then((userInfo) => {
          if (userInfo) {
            setAppUser(userInfo);
          }
        });
      }
    }
  }, []);

  const refetchUser = async (userId: string) => {
    const userInfo = await authService.getMe(userId);
    const currentUser = Cookies.get("currentUser");

    if (userInfo && currentUser) {
      const newUser = {
        ...JSON.parse(currentUser),
        username: userInfo.username,
        avatar: userInfo.avatar,
      };
      Cookies.set("currentUser", JSON.stringify(newUser));
      setUser(newUser);
      setAppUser(userInfo);
    }
  };

  return { user, appUser, refetchUser };
};
