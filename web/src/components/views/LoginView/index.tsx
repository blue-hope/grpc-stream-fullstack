import LoginForm from "@components/organisms/LoginForm";
import React, { FC } from "react";

interface LoginViewProps {}

const LoginView: FC<LoginViewProps> = () => {
  return (
    <div className="h-screen flex-center bg-red-50">
      <div className="w-full">
        <div className="mt-10 w-full text-center font-bold text-4xl">LOGIN</div>
        <div className="mt-2 mb-10 w-full text-center font-semibold text-md text-gray-500">
          채팅의 새로운 기준, QHAT
        </div>
        <div className="w-full flex-center">
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
