import {
  CreateRequest as ChatCreateRequest,
  CreateResponse as ChatCreateResponse,
  ReadRequest as ChatReadRequest,
  ReadResponse as ChatReadResponse,
} from "@api/_proto/grpc/qhat/chat/message_pb";
import { ChatServiceClient } from "@api/_proto/grpc/qhat/chat/service_pb_service";
import { grpc } from "@improbable-eng/grpc-web";
import { grpcCallbackWrapper } from "@utils/grpcCallbackWrapper";

const client = new ChatServiceClient("http://localhost:6564", {
  transport: grpc.CrossBrowserHttpTransport({ withCredentials: false }),
});

export const wsClient = new ChatServiceClient("http://localhost:6564", {
  transport: grpc.WebsocketTransport(),
});

export async function chatCreate(
  chatCreateRequest: ChatCreateRequest
): Promise<ChatCreateResponse> {
  return grpcCallbackWrapper(client.create.bind(client), chatCreateRequest);
}

export async function chatRead(
  chatReadRequest: ChatReadRequest
): Promise<ChatReadResponse> {
  return grpcCallbackWrapper(client.read.bind(client), chatReadRequest);
}
