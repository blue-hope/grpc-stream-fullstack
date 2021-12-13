import { ChatMessageProto } from "@api/_proto/grpc/qhat/chat/message_pb";
import ImageWrapper from "@components/atoms/Image";
import React, { FC, memo } from "react";

interface ChatMessageProps {
  message: ChatMessageProto;
  isMine: boolean;
}

const ChatMessage: FC<ChatMessageProps> = ({ message, isMine }) => {
  return (
    <div className="relative mt-3">
      <div className={`flex ${isMine && "justify-end"}`}>
        <span
          className={`${
            isMine ? "mr-8" : "ml-8"
          } px-2 py-1 bg-white border border-gray-400 rounded-xl`}
        >
          {message.getMessage()}
        </span>
      </div>
      <div className={`absolute top-1 ${isMine && "right-0"}`}>
        <ImageWrapper
          src={`https://avatars.dicebear.com/api/identicon/${message
            .getChatUser()
            ?.getUser()
            ?.getEmail()}.svg`}
          width="20px"
          height="20px"
        />
      </div>
    </div>
  );
};

const MemoChatMessage = memo(ChatMessage);
export default MemoChatMessage;
