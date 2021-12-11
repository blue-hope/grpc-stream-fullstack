import { FriendProto } from "@api/_proto/grpc/qhat/friend/message_pb";
import { atom } from "recoil";

export const FriendAcceptedState = atom<FriendProto[]>({
  key: "FriendAcceptedState",
  default: [],
});

export const FriendSentState = atom<FriendProto[]>({
  key: "FriendSentState",
  default: [],
});

export const FriendReceivedState = atom<FriendProto[]>({
  key: "FriendReceivedState",
  default: [],
});
