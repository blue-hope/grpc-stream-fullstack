import {
  LoginRequest,
  LoginResponse,
} from "@api/_proto/grpc/qhat/auth/message_pb";
import { AuthServiceClient } from "@api/_proto/grpc/qhat/auth/service_pb_service";
import { grpc } from "@improbable-eng/grpc-web";
import { grpcCallbackWrapper } from "@utils/grpcCallbackWrapper";

const client = new AuthServiceClient("http://localhost:6564", {
  transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
});

export async function login(
  loginRequest: LoginRequest
): Promise<LoginResponse> {
  return grpcCallbackWrapper(client.login.bind(client), loginRequest);
}
