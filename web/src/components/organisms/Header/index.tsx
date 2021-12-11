import React, { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="min-w-screen-lg h-20 border-b border-gray-200 dark:border-opacity-10"></div>
  );
};

export default Header;
