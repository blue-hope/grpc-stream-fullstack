import {
  CreateRequest as UserCreateRequest,
  CreateResponse as UserCreateResponse,
  SearchRequest,
  SearchResponse,
} from "@api/_proto/grpc/qhat/user/message_pb";
import {
  UnauthorizedUserServiceClient,
  UserServiceClient,
} from "@api/_proto/grpc/qhat/user/service_pb_service";
import { grpc } from "@improbable-eng/grpc-web";
import { grpcCallbackWrapper } from "@utils/grpcCallbackWrapper";

const unauthorizedClient = new UnauthorizedUserServiceClient(
  "http://localhost:6564",
  {
    transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
  }
);
const client = new UserServiceClient("http://localhost:6564", {
  transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
});

export async function userCreate(
  userCreateRequest: UserCreateRequest
): Promise<UserCreateResponse> {
  return grpcCallbackWrapper(
    unauthorizedClient.create.bind(client),
    userCreateRequest
  );
}

export async function userSearch(
  userReadRequest: SearchRequest
): Promise<SearchResponse> {
  return grpcCallbackWrapper(client.search.bind(client), userReadRequest);
}
