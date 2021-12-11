import { LoginRequest } from "@api/_proto/grpc/qhat/auth/message_pb";
import { login } from "@api/auth";
import { AuthState } from "@stores/auth";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useRouter } from "next/router";
import nookies from "nookies";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

interface LoginFormProps {}

interface LabelProps {
  name: string;
}

const Label: FC<LabelProps> = ({ name }) => {
  return (
    <label
      className="block text-gray-500 font-bold text-left mb-2 pr-4"
      htmlFor="inline-full-name"
    >
      {name}
    </label>
  );
};

const LoginForm: FC<LoginFormProps> = () => {
  const router = useRouter();
  const [request] = useState(new LoginRequest());
  const setAuthState = useSetRecoilState(AuthState);

  function setCookies(accessToken: string, refreshToken: string) {
    const now = Math.round(new Date().getTime() / 1000);
    nookies.set(null, "accessToken", accessToken, {
      maxAge: jwt_decode<JwtPayload>(accessToken).exp! - now,
      path: "/",
    });
    nookies.set(null, "refreshToken", refreshToken, {
      maxAge: jwt_decode<JwtPayload>(refreshToken).exp! - now,
      path: "/",
    });
  }

  async function handleLogin() {
    const id = toast.loading("요청을 처리중입니다...");
    try {
      const loginResponse = await login(request);
      setAuthState({
        accessToken: loginResponse.getAccessToken(),
        refreshToken: loginResponse.getRefreshToken(),
      });
      setCookies(
        loginResponse.getAccessToken(),
        loginResponse.getRefreshToken()
      );
      router.push("/friend");
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
      });
    } catch (e: any) {
      toast.update(id, {
        render: e.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  return (
    <div className="w-3/4">
      <div className="flex flex-wrap mb-6">
        <div className="w-full">
          <Label name="Email"></Label>
        </div>
        <div className="w-full">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-400"
            type="email"
            placeholder="dave.kwon@mathpresso.com"
            onChange={(e) => request.setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap mb-6">
        <div className="w-full">
          <Label name="Password"></Label>
        </div>
        <div className="w-full">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-400"
            type="password"
            placeholder="******************"
            onChange={(e) => request.setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full">
          <button
            className="shadow w-full bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
