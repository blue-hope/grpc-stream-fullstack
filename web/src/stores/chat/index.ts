import {
  ChatRoomProto,
  ChatUserProto,
  MessageRequest,
  MessageResponse,
} from "@api/_proto/grpc/qhat/chat/message_pb";
import { BidirectionalStream } from "@api/_proto/grpc/qhat/user/service_pb_service";
import { atom } from "recoil";

export enum OpenedChatViewType {
  CHAT_LIST = "채팅",
  CHAT_CREATE = "채팅방 생성",
  CHAT_ROOM = "",
}

export const OpenedChatViewState = atom<string>({
  key: "OpenedChatViewState",
  default: OpenedChatViewType.CHAT_LIST,
});

export const ChatSearchkeywordState = atom<string>({
  key: "ChatSearchkeywordState",
  default: "",
});

interface IChatRoomState {
  chatRoom?: ChatRoomProto;
  chatUsers?: ChatUserProto[];
  chatUserMe?: ChatUserProto;
}

export const ChatRoomState = atom<IChatRoomState>({
  key: "ChatRoomState",
  default: {},
});

export const ChatStreamState = atom<
  BidirectionalStream<MessageRequest, MessageResponse> | undefined
>({
  key: "ChatStreamState",
  default: undefined,
});
