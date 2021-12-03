/* eslint-disable jsx-a11y/alt-text */
import Image from "@components/atoms/Image";
import Link from "@components/atoms/Link";
import { BaseProps } from "@utils/baseprops";
import React, { FC } from "react";

interface LogoProps extends BaseProps {}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/">
      <div className={`w-40 mt-4 ${className}`}>
        <Image src="img_logo_black.png" />
      </div>
    </Link>
  );
};

export default Logo;
