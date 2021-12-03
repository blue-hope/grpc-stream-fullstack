/* eslint-disable jsx-a11y/alt-text */
import Image from "@components/atoms/Image";
import Link from "@components/atoms/Link";
import { BaseProps } from "@utils/baseprops";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

const IconSizes = {
  friend: "40%",
  chat: "30%",
  noti: "38%",
  setting: "35%",
};

interface FooterNavProps extends BaseProps {
  href: keyof typeof IconSizes;
}

const FooterNav: FC<FooterNavProps> = ({ className, href }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <div className={`w-full h-full flex-center ${className}`}>
        {router.pathname.includes(href) ? (
          <Image
            src={`/icons/icon_${href}_active.svg`}
            width={IconSizes[href]}
            height={IconSizes[href]}
          />
        ) : (
          <Image
            src={`/icons/icon_${href}_inactive.svg`}
            width={IconSizes[href]}
            height={IconSizes[href]}
          />
        )}
      </div>
    </Link>
  );
};

export default FooterNav;
