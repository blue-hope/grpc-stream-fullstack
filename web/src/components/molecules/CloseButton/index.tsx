import ImageWrapper from "@components/atoms/Image";
import React, { FC } from "react";

interface CloseButtonProps {
  handler: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ handler }) => {
  return (
    <div className="absolute top-5 right-5" onClick={handler}>
      <ImageWrapper src="/icons/icon_close.svg" width="30px" height="30px" />
    </div>
  );
};

export default CloseButton;
