import MainNav from "@components/molecules/MainNav";
import React, { FC } from "react";

interface MainViewProps {}

const MainView: FC<MainViewProps> = () => {
  return (
    <div className="h-screen flex-center bg-red-50">
      <div className="w-full">
        <div className="mt-10 w-full text-center font-bold text-4xl">QHAT</div>
        <div className="mt-2 mb-10 w-full text-center font-semibold text-md text-gray-500">
          채팅의 새로운 기준
        </div>
        <MainNav href="login">기존 계정으로 로그인</MainNav>
        <MainNav href="signup">새로운 계정 만들기</MainNav>
      </div>
    </div>
  );
};

export default MainView;
