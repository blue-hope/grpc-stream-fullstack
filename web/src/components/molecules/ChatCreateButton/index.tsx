import ImageWrapper from "@components/atoms/Image";
import React, { FC } from "react";

interface ChatCreateButtonProps {
  handler: () => void;
}

const ChatCreateButton: FC<ChatCreateButtonProps> = ({ handler }) => {
  return (
    <div className="absolute top-5 right-5" onClick={handler}>
      <ImageWrapper
        src="/icons/icon_chat_plus.svg"
        width="30px"
        height="30px"
      />
    </div>
  );
};

export default ChatCreateButton;
