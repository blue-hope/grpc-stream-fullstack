import { friendReadAccepted } from "@api/friend";
import UserProfileInline from "@components/molecules/UserProfileInline";
import BackgroundTemplate from "@components/templates/BackgroundTemplate";
import { FriendAcceptedState } from "@stores/friend";
import React, { FC, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

interface FriendViewProps {}

const FriendView: FC<FriendViewProps> = () => {
  const [response, setResponse] = useRecoilState(FriendAcceptedState);

  const readAccepted = useCallback(
    async function () {
      const readResponse = await friendReadAccepted();
      setResponse(readResponse.getFriendsList());
    },
    [setResponse]
  );

  async function openChatRoom(friendId: number) {
    // await prepareChatRoom();
    // openChatRoomView() && router.push("/chat")
  }

  useEffect(() => {
    readAccepted();
  }, [readAccepted]);

  return (
    <BackgroundTemplate title="친구">
      {response.map((friend) => (
        <UserProfileInline user={friend.getReceiver()!} key={friend.getId()}>
          {
            <div
              className="absolute top-3 right-3 font-semibold text-blue-400"
              onClick={() => openChatRoom(user.getId())}
            >
              1:1 대화
            </div>
          }
        </UserProfileInline>
      ))}
    </BackgroundTemplate>
  );
};

export default FriendView;
