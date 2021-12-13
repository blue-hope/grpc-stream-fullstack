import { CreateRequest as ChatCreateRequest } from "@api/_proto/grpc/qhat/chat/message_pb";
import { FriendProto } from "@api/_proto/grpc/qhat/friend/message_pb";
import { UserProto } from "@api/_proto/grpc/qhat/user/message_pb";
import { chatCreate } from "@api/chat";
import { friendReadAccepted } from "@api/friend";
import ImageWrapper from "@components/atoms/Image";
import UserProfileInline from "@components/molecules/UserProfileInline";
import {
  ChatRoomState,
  ChatSearchkeywordState,
  OpenedChatViewState,
  OpenedChatViewType,
} from "@stores/chat";
import { FriendAcceptedState } from "@stores/friend";
import {
  updateToastForClose,
  updateToastForError,
  updateToastForLoading,
} from "@utils/updateToast";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface ChatCreateProps {}

const ChatCreate: FC<ChatCreateProps> = () => {
  const [request] = useState(new ChatCreateRequest());
  const [chatUsers, setChatUsers] = useState<UserProto[]>([]);
  const [response, setResponse] = useRecoilState(FriendAcceptedState);
  const [keyword, setKeyword] = useRecoilState(ChatSearchkeywordState);
  const setOpenedChatViewType = useSetRecoilState(OpenedChatViewState);
  const setChatRoomState = useSetRecoilState(ChatRoomState);

  const readAccepted = useCallback(
    async function () {
      const readResponse = await friendReadAccepted();
      setResponse(readResponse.getFriendsList());
    },
    [setResponse]
  );

  function addFriend(friend: FriendProto) {
    if (
      chatUsers.filter(
        (chatUser) => chatUser.getId() === friend.getReceiver()?.getId()
      ).length > 0
    )
      return;
    setChatUsers([...chatUsers, friend.getReceiver()!]);
  }

  function removeFriend(user: UserProto) {
    setChatUsers(
      chatUsers.filter((chatUser) => chatUser.getId() !== user.getId())
    );
  }

  function filterFriend(friend: FriendProto): boolean {
    return (
      keyword.trim().length === 0 ||
      (friend.getReceiver()?.getUserName().includes(keyword) ?? false)
    );
  }

  async function createChat() {
    const id = updateToastForLoading();
    if (chatUsers.length === 0) {
      updateToastForError(id, "친구를 추가해주세요.");
      return;
    }
    if (chatUsers.length !== 1 && request.getName().trim().length === 0) {
      updateToastForError(id, "채팅방 이름을 입력해주세요.");
      return;
    }
    request.setUsersList(chatUsers);
    try {
      const response = await chatCreate(request);
      updateToastForClose(id);
      setChatRoomState({
        chatRoom: response.getChatRoom(),
        chatUsers: response.getChatUsersList(),
        chatUserMe: response.getChatUserMe(),
      });
      setOpenedChatViewType(OpenedChatViewType.CHAT_ROOM);
    } catch (e: any) {
      updateToastForError(id, e.message);
    }
  }

  useEffect(() => {
    readAccepted();
  }, [readAccepted]);

  return (
    // TODO: divide into smaller components
    <div className="relative">
      <input
        style={{ width: "calc(100% - 60px)" }}
        className="mt-5 border-2 border-gray-200 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-red-400"
        name="name"
        placeholder="친구 이름 검색"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div
        className="absolute top-7 right-2.5 font-semibold text-blue-400"
        onClick={() => createChat()}
      >
        생성
      </div>
      <div className="absolute top-4 mt-3.5 mr-2 right-16">
        <ImageWrapper
          src="/icons/icon_searchbar.svg"
          width="15px"
          height="15px"
        />
      </div>
      {chatUsers.length > 1 && (
        <input
          className="w-full mt-2 border-2 border-gray-200 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-red-400"
          name="name"
          placeholder="채팅방 이름"
          onChange={(e) => request.setName(e.target.value)}
        />
      )}
      {chatUsers.map((user) => (
        <div
          className="relative mt-2 mr-2 p-1 pl-2 pr-5 inline-block border-2 border-red-300 rounded-xl text-sm"
          key={user.getId()}
        >
          {user.getUserName()}
          <div
            className="absolute top-1.5 right-1"
            onClick={() => removeFriend(user)}
          >
            <ImageWrapper
              src="/icons/icon_close.svg"
              width="15px"
              height="15px"
            />
          </div>
        </div>
      ))}
      {response
        .filter((friend) => filterFriend(friend))
        .map((friend) => (
          <UserProfileInline user={friend.getReceiver()!} key={friend.getId()}>
            {
              <div
                className="absolute top-3 right-3 font-semibold text-blue-400"
                onClick={() => addFriend(friend)}
              >
                추가
              </div>
            }
          </UserProfileInline>
        ))}
    </div>
  );
};

export default ChatCreate;
