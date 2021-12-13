import { ServiceError } from "@api/_proto/grpc/qhat/user/service_pb_service";
import { grpc } from "@improbable-eng/grpc-web";
import { getAuthorizationToken } from "@utils/getAuthorizationToken";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

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
