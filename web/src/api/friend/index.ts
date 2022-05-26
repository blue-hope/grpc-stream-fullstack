import {
  CreateRequest as FriendCreateRequest,
  CreateResponse as FriendCreateResponse,
  ReadResponse as FriendReadResponse,
  ControlRequest as FriendControlRequest,
} from "@api/_proto/grpc/qhat/friend/message_pb";
import { FriendServiceClient } from "@api/_proto/grpc/qhat/friend/service_pb_service";
import { grpc } from "@improbable-eng/grpc-web";
import { grpcCallbackWrapper } from "@utils/grpcCallbackWrapper";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

const client = new FriendServiceClient("http://localhost:6564", {
  transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
  debug: true,
});

export async function friendCreate(
  friendCreateRequest: FriendCreateRequest
): Promise<FriendCreateResponse> {
  return grpcCallbackWrapper(client.create.bind(client), friendCreateRequest);
}

export async function friendReadAccepted(): Promise<FriendReadResponse> {
  return grpcCallbackWrapper(client.readAccepted.bind(client));
}

export async function friendReadSent(): Promise<FriendReadResponse> {
  return grpcCallbackWrapper(client.readSent.bind(client));
}

export async function friendReadReceived(): Promise<FriendReadResponse> {
  return grpcCallbackWrapper(client.readReceived.bind(client));
}

export async function friendCancel(
  friendControlRequest: FriendControlRequest
): Promise<Empty> {
  return grpcCallbackWrapper(client.cancel.bind(client), friendControlRequest);
}

export async function friendAccept(
  friendControlRequest: FriendControlRequest
): Promise<Empty> {
  return grpcCallbackWrapper(client.accept.bind(client), friendControlRequest);
}

export async function friendRefuse(
  friendControlRequest: FriendControlRequest
): Promise<Empty> {
  return grpcCallbackWrapper(client.refuse.bind(client), friendControlRequest);
}
