import { User } from "@api/_proto/grpc/qhat/user/entity_pb";
import {
  CreateRequest as UserCreateRequest,
  UserProto,
} from "@api/_proto/grpc/qhat/user/message_pb";
import { UserServiceClient } from "@api/_proto/grpc/qhat/user/service_pb_service";
import React, { FC, useState } from "react";

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
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSignUp() {
    const request = new UserCreateRequest();
    const user = new User();
    user.setUsername(userName);
    user.setEmail(email);
    request.setUser(user);
    request.setPassword(password);
  }

  return (
    <div className="w-3/4">
      <div className="flex flex-wrap mb-6">
        <div className="w-full">
          <Label name="Name"></Label>
        </div>
        <div className="w-full">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-400"
            type="text"
            placeholder="Dave Kwon"
            onChange={(e) => setUserName(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap mb-6">
        <div className="w-full">
          <Label name="Email"></Label>
        </div>
        <div className="w-full">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-400"
            type="email"
            placeholder="dave.kwon@mathpresso.com"
            onChange={(e) => setEmail(e.target.value)}
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
