import { UserProto } from "@api/_proto/grpc/qhat/user/message_pb";
import ImageWrapper from "@components/atoms/Image";
import React, { FC, ReactNode } from "react";

interface UserProfileInlineProps {
  user: UserProto;
  children?: ReactNode;
}

const UserProfileInline: FC<UserProfileInlineProps> = ({ user, children }) => {
  return (
    <div className="w-full h-30 mt-4 p-3 text-sm relative">
      <div className="absolute">
        <ImageWrapper
          src={`https://avatars.dicebear.com/api/identicon/${user.getEmail()}.svg`}
          width="20px"
          height="20px"
        />
      </div>
      <div className="ml-8">{user.getUserName()}</div>
      {children}
    </div>
  );
};

export default UserProfileInline;
