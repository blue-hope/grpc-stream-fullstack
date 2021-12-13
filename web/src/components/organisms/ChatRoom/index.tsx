import {
  ChatMessageProto,
  ChatRoomProto,
  MessageRequest,
  MessageResponse,
  ReadRequest as ChatReadRequest,
} from "@api/_proto/grpc/qhat/chat/message_pb";
import { BidirectionalStream } from "@api/_proto/grpc/qhat/chat/service_pb_service";
import { chatRead, wsClient } from "@api/chat";
import ChatMessage from "@components/molecules/ChatMessage";
import { grpc } from "@improbable-eng/grpc-web";
import { ChatRoomState, ChatStreamState } from "@stores/chat";
import { getAuthorizationToken } from "@utils/getAuthorizationToken";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface ChatRoomProps {}

const ChatRoom: FC<ChatRoomProps> = () => {
  const [message, setMessage] = useState("");
  const [stream, setStream] = useRecoilState(ChatStreamState);
  const [messages, setMessages] = useState<ChatMessageProto[]>([]);
  const chatRoomState = useRecoilValue(ChatRoomState);
  const ref = useRef<HTMLDivElement>(null);

  const readMessage = useCallback(
    async function readMessage() {
      const request = new ChatReadRequest();
      request.setChatRoom(chatRoomState.chatRoom);
      const response = await chatRead(request);
      setMessages(response.getChatMessagesList());
      scrollDown();
    },
    [chatRoomState.chatRoom]
  );

  function scrollDown() {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }

  function sendMessage() {
    if (message.trim().length === 0) return;
    const request = new MessageRequest();
    const chatMessage = new ChatMessageProto();
    chatMessage.setMessage(message);
    chatMessage.setChatRoom(chatRoomState.chatRoom);
    chatMessage.setChatUser(chatRoomState.chatUserMe);
    request.setChatMessage(chatMessage);
    stream?.write(request);
    setMessage("");
  }

  const handleMessage = useCallback(function (response: MessageResponse) {
    const chatMessage = response.getChatMessage();
    setMessages((prev) => [...prev, chatMessage!]);
    scrollDown();
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  useEffect(() => {
    const metadata = new grpc.Metadata({
      Authorization: `Bearer ${getAuthorizationToken()}`,
    });
    const stream = wsClient.chat(metadata);
    stream.on("data", (response) => handleMessage(response));
    setStream(stream);
  }, [handleMessage, setStream]);

  useEffect(() => {
    readMessage();
  }, [readMessage]);

  return (
    <div className="relative">
      <input
        className="fixed bottom-16 w-full left-0 mt-2 border border-t-gray-200 bg-white h-10 px-5 pr-16 text-sm focus:outline-none focus:border-red-400"
        name="name"
        placeholder="메시지 입력"
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      <div
        className="fixed bottom-16 mb-2 right-3 font-semibold text-blue-400"
        onClick={sendMessage}
      >
        입력
      </div>
      <div className="w-full h-full"></div>
      <div
        ref={ref}
        style={{ height: "calc(100% - 180px)" }}
        className="fixed w-full px-5 left-0 bottom-28 overflow-scroll"
        id="ssss"
      >
        {messages.map((message) => (
          <ChatMessage
            message={message}
            isMine={
              message.getChatUser()?.getId() ===
              chatRoomState.chatUserMe?.getId()
            }
            key={message.getId()}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
