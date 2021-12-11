import { ControlRequest } from "@api/_proto/grpc/qhat/friend/message_pb";
import {
  friendAccept,
  friendCancel,
  friendReadReceived,
  friendReadSent,
  friendRefuse,
} from "@api/friend";
import FriendInline from "@components/molecules/FriendInline";
import { FriendReceivedState, FriendSentState } from "@stores/friend";
import React, { FC, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

interface NotiResultProps {}

const NotiResult: FC<NotiResultProps> = () => {
  const [sentResponse, setSentResponse] = useRecoilState(FriendSentState);
  const [receivedResponse, setReceivedResponse] =
    useRecoilState(FriendReceivedState);

  async function cancelFriend(friendId: number) {
    const request = new ControlRequest();
    request.setId(friendId);
    await friendCancel(request);
    await readSent();
  }

  async function acceptFriend(friendId: number) {
    const request = new ControlRequest();
    request.setId(friendId);
    await friendAccept(request);
    await readReceived();
  }

  async function refuseFriend(friendId: number) {
    const request = new ControlRequest();
    request.setId(friendId);
    await friendRefuse(request);
    await readReceived();
  }

  const readSent = useCallback(
    async function () {
      const friendReadSentResponse = await friendReadSent();
      setSentResponse(friendReadSentResponse.getFriendsList());
    },
    [setSentResponse]
  );

  const readReceived = useCallback(
    async function () {
      const friendReadReceivedResponse = await friendReadReceived();
      setReceivedResponse(friendReadReceivedResponse.getFriendsList());
    },
    [setReceivedResponse]
  );

  const readAll = useCallback(
    async function () {
      await Promise.all([readSent(), readReceived()]);
    },
    [readSent, readReceived]
  );

  useEffect(() => {
    readAll();
  }, [readAll]);

  return (
    <div className="w-full">
      <div className="w-full mt-5 pb-2 border-b border-gray-400 font-semibold">
        보낸 요청
      </div>
      {sentResponse.map((friend) => (
        <FriendInline
          friend={friend}
          receiver={friend.getReceiver()}
          key={friend.getId()}
        >
          <div
            className="absolute top-3 right-3 font-semibold text-red-400"
            onClick={() => {
              cancelFriend(friend.getId());
            }}
          >
            요청 취소
          </div>
        </FriendInline>
      ))}
      {sentResponse.length == 0 && (
        <div className="mt-10 mb-10 w-full flex-center font-bold text-sm text-red-400">
          보낸 요청이 없습니다
        </div>
      )}
      <div className="w-full mt-5 pb-2 border-b border-gray-400 font-semibold">
        받은 요청
      </div>
      {receivedResponse.map((friend) => (
        <FriendInline
          friend={friend}
          sender={friend.getSender()}
          key={friend.getId()}
        >
          <div
            className="absolute top-3 right-20 mr-1 font-semibold text-blue-400"
            onClick={() => {
              acceptFriend(friend.getId());
            }}
          >
            요청 수락
          </div>
          <div
            className="absolute top-3 right-3 font-semibold text-red-400"
            onClick={() => {
              refuseFriend(friend.getId());
            }}
          >
            요청 거절
          </div>
        </FriendInline>
      ))}
      {receivedResponse.length == 0 && (
        <div className="mt-10 mb-10 w-full flex-center font-bold text-sm text-red-400">
          받은 요청이 없습니다
        </div>
      )}
    </div>
  );
};

export default NotiResult;
