import { ServiceError } from "@api/_proto/grpc/qhat/user/service_pb_service";

export function grpcCallbackWrapper(
  callable: (
    param: any,
    callback: (err: ServiceError | null, data: any) => any
  ) => any,
  param: any
): Promise<any> {
  return new Promise(function (resolve, reject) {
    callable(param, function (err, data) {
      if (err !== null) reject(err);
      else resolve(data);
    });
  });
}
