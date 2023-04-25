import { AuthService } from "./authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const authService = new AuthService(API_BASE_URL);
