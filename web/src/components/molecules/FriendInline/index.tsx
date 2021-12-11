/* eslint-disable jsx-a11y/alt-text */
import { FriendProto } from "@api/_proto/grpc/qhat/friend/message_pb";
import { UserProto } from "@api/_proto/grpc/qhat/user/message_pb";
import Image from "@components/atoms/Image";
import { timeAgo, timestampToDate } from "@utils/date";
import React, { FC, ReactNode } from "react";

interface FriendInlineProps {
  friend: FriendProto;
  sender?: UserProto;
  receiver?: UserProto;
  children?: ReactNode;
}

const FriendInline: FC<FriendInlineProps> = ({
  friend,
  sender,
  receiver,
  children,
}) => {
  const user = sender ?? receiver;
  return (
    <div className="w-full h-30 mt-4 p-3 text-sm relative">
      {user && (
        <div className="absolute">
          <Image
            src={`https://avatars.dicebear.com/api/identicon/${user.getEmail()}.svg`}
            width="20px"
            height="20px"
          />
        </div>
      )}
      <div className="ml-8 inline">{user?.getUserName()} · </div>
      <div className="inline text-xs text-gray-600">
        {timeAgo(timestampToDate(friend.getCreatedAt()))}
      </div>
      {children}
    </div>
  );
};

export default FriendInline;
