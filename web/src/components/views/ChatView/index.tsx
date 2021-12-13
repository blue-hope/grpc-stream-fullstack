import ChatCreateButton from "@components/molecules/ChatCreateButton";
import CloseButton from "@components/molecules/CloseButton";
import ChatCreate from "@components/organisms/ChatCreate";
import ChatList from "@components/organisms/ChatList";
import ChatRoom from "@components/organisms/ChatRoom";
import BackgroundTemplate from "@components/templates/BackgroundTemplate";
import {
  ChatRoomState,
  ChatStreamState,
  OpenedChatViewState,
  OpenedChatViewType,
} from "@stores/chat";
import React, { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface ChatViewProps {}

const ChatView: FC<ChatViewProps> = () => {
  const [openedChatViewType, setOpenedChatViewType] =
    useRecoilState(OpenedChatViewState);
  const chatRoomState = useRecoilValue(ChatRoomState);
  const [stream, setStream] = useRecoilState(ChatStreamState);

  function getTitle() {
    return openedChatViewType === OpenedChatViewType.CHAT_ROOM
      ? chatRoomState.chatRoom?.getName().trim().length === 0
        ? chatRoomState.chatUsers
            ?.map((chatUser) => chatUser.getUser()?.getUserName())
            .join(", ")
        : chatRoomState.chatRoom?.getName()
      : openedChatViewType;
  }

  return (
    <BackgroundTemplate title={getTitle()}>
      {openedChatViewType === OpenedChatViewType.CHAT_LIST && (
        <div>
          <ChatCreateButton
            handler={() => {
              setOpenedChatViewType(OpenedChatViewType.CHAT_CREATE);
            }}
          ></ChatCreateButton>
          <ChatList></ChatList>
        </div>
      )}
      {openedChatViewType === OpenedChatViewType.CHAT_CREATE && (
        <div>
          <CloseButton
            handler={() => {
              setOpenedChatViewType(OpenedChatViewType.CHAT_LIST);
            }}
          ></CloseButton>
          <ChatCreate></ChatCreate>
        </div>
      )}
      {openedChatViewType === OpenedChatViewType.CHAT_ROOM && (
        <div>
          <CloseButton
            handler={() => {
              setOpenedChatViewType(OpenedChatViewType.CHAT_LIST);
              stream?.end();
              setStream(undefined);
            }}
          ></CloseButton>
          <ChatRoom></ChatRoom>
        </div>
      )}
    </BackgroundTemplate>
  );
};

export default ChatView;
