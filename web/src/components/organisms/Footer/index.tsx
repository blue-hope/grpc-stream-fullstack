import FooterNav from "@components/molecules/FooterNav";
import React, { FC, useEffect } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="fixed bottom-0 w-screen h-16 flex-center bg-gray-100">
      <FooterNav href="friend" />
      <FooterNav href="chat" />
      <FooterNav href="noti" />
      <FooterNav href="setting" />
    </div>
  );
};

export default Footer;
