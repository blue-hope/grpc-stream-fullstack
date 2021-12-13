import { atom } from "recoil";

interface IAuthState {
  accessToken?: string;
  refreshToken?: string;
}

export const AuthState = atom<IAuthState>({
  key: "AuthState",
  default: {},
});
