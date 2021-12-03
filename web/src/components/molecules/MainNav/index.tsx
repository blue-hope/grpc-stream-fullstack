/* eslint-disable jsx-a11y/alt-text */
import Link from "@components/atoms/Link";
import { BaseProps } from "@utils/baseprops";
import React, { FC, ReactNode, useEffect } from "react";

interface MainNavProps extends BaseProps {
  children?: ReactNode;
  href: string;
}

const MainNav: FC<MainNavProps> = ({ className, children, href }) => {
  return (
    <div className="w-full h-16 mt-2">
      <Link href={href}>
        <div
          className={`w-3/4 h-full bg-red-300 rounded flex-center ${className}`}
        >
          <div className="font-bold text-white">{children}</div>
        </div>
      </Link>
    </div>
  );
};

export default MainNav;
