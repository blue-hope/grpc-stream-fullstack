import { LoginRequest } from "@api/_proto/grpc/qhat/auth/message_pb";
import { login } from "@api/auth";
import { AuthState } from "@stores/auth";
import jwt_decode, { JwtPayload } from "jwt-decode";
import nookies from "nookies";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";

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
  const [request] = useState(new LoginRequest());
  const [authState, setAuthState] = useRecoilState(AuthState);

  function setCookies() {
    const now = Math.round(new Date().getTime() / 1000);
    authState.accessToken &&
      nookies.set(null, "accessToken", authState.accessToken, {
        maxAge: jwt_decode<JwtPayload>(authState.accessToken).exp! - now,
        path: "/",
      });
    authState.refreshToken &&
      nookies.set(null, "refreshToken", authState.refreshToken, {
        maxAge: jwt_decode<JwtPayload>(authState.refreshToken).exp! - now,
        path: "/",
      });
  }

  async function handleLogin() {
    try {
      const loginResponse = await login(request);
      setAuthState({
        accessToken: loginResponse.getAccesstoken(),
        refreshToken: loginResponse.getRefreshtoken(),
      });
      setCookies();
    } catch (e) {}
    // router.push("/friend");
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
