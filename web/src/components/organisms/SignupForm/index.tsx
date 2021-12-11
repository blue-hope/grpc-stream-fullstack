import {
  CreateRequest as UserCreateRequest,
  UserProto,
} from "@api/_proto/grpc/qhat/user/message_pb";
import { userCreate } from "@api/user";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface SignupFormProps {}

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

const SignupForm: FC<SignupFormProps> = () => {
  const router = useRouter();
  const [user] = useState(new UserProto());
  const [request] = useState(new UserCreateRequest());

  async function handleSignUp() {
    const id = toast.loading("요청을 처리중입니다...");
    try {
      await userCreate(request);
      toast.update(id, {
        render: "회원가입 되었습니다. 로그인 해주세요.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      router.push("/login");
    } catch (e: any) {
      toast.update(id, {
        render: e.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  useEffect(() => {
    request.setUser(user);
  }, [request, user]);

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
            onChange={(e) => user.setEmail(e.target.value)}
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
      <div className="flex flex-wrap mb-6">
        <div className="w-full">
          <Label name="Name"></Label>
        </div>
        <div className="w-full">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-400"
            type="text"
            placeholder="Dave Kwon"
            onChange={(e) => user.setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full">
          <button
            className="shadow w-full bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
