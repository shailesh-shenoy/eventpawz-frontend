import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Request timed out",
    });
  }

  login = async (username: string, password: string) => {
    const res = await this.instance.post("/auth/login", {
      username,
      password,
    });
    return {
      username: res.data.username,
      id: res.data.id,
      accessToken: res.data.accessToken,
    };
  };

  getMe = async (userId: string) => {
    const res = await this.instance.get(`/users/${userId}`, {
      headers: getAuthorizationHeader(),
    });
    return res.data;
  };
}
