import { UserProto } from "@api/_proto/grpc/qhat/user/message_pb";
import { atom } from "recoil";

export const UserState = atom<UserProto | undefined>({
  key: "UserState",
  default: undefined,
});
