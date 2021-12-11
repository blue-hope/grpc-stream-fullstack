import FooterNav from "@components/molecules/FooterNav";
import React, { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="fixed bottom-0 w-screen h-16 flex-center bg-red-100">
      <FooterNav href="friend" />
      <FooterNav href="chat" />
      <FooterNav href="search" />
      <FooterNav href="noti" />
    </div>
  );
};

export default Footer;
