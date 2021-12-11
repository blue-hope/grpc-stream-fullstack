import { ServiceError } from "@api/_proto/grpc/qhat/user/service_pb_service";
import { getRecoil, setRecoil } from "@components/atoms/RecoilNexus";
import { grpc } from "@improbable-eng/grpc-web";
import { AuthState } from "@stores/auth";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import nookies from "nookies";

type Callback = (err: ServiceError | null, data: any) => any;
type ParamRequiredCallable = (
  param: any,
  metaData: grpc.Metadata,
  callback: Callback
) => any;

export function grpcCallbackWrapper(
  callable: ParamRequiredCallable,
  param: any = new Empty()
): Promise<any> {
  const authState = getRecoil(AuthState);

  function getAuthorizationToken() {
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

  return new Promise(function (resolve, reject) {
    const metadata = new grpc.Metadata({
      Authorization: `Bearer ${getAuthorizationToken()}`,
    });
    const callback = function (err: ServiceError | null, data: any) {
      if (err !== null) reject(err);
      else resolve(data);
    };
    callable(param, metadata, callback);
  });
}
