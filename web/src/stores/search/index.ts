import { UserProto } from "@api/_proto/grpc/qhat/user/message_pb";
import { atom } from "recoil";

export const SearchkeywordState = atom<string>({
  key: "SearchkeywordState",
  default: "",
});

export const SearchResultState = atom<UserProto[]>({
  key: "SearchResultState",
  default: [],
});
