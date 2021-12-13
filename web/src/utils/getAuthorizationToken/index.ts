import { getRecoil, setRecoil } from "@components/atoms/RecoilNexus";
import { AuthState } from "@stores/auth";
import nookies from "nookies";

export function getAuthorizationToken() {
  const authState = getRecoil(AuthState);
  // TODO: Is it valid?
  const storedToken = authState.accessToken ?? authState.refreshToken;
  if (storedToken) {
    return storedToken;
  }
  const cookiedAccessToken = nookies.get(null).accessToken;
  const cookiedRefreshToken = nookies.get(null).refreshToken;
  setRecoil(AuthState, {
    accessToken: cookiedAccessToken,
    refreshToken: cookiedRefreshToken,
  });
  return cookiedAccessToken ?? cookiedRefreshToken;
}
