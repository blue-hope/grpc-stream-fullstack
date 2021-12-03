import { BaseProps } from "@utils/baseprops";
import Image from "next/image";
import React, { FC } from "react";

interface ImageProps extends BaseProps {
  src: string;
  width: string;
  height: string;
}

const ImageWrapper: FC<ImageProps> = ({ src, className, width, height }) => {
  return (
    <Image
      src={src}
      className={className}
      alt={src}
      width={width}
      height={height}
    ></Image>
  );
};

export default ImageWrapper;
