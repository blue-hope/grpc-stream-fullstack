import { CreateRequest as FriendCreateRequest } from "@api/_proto/grpc/qhat/friend/message_pb";
import { SearchRequest } from "@api/_proto/grpc/qhat/user/message_pb";
import { friendCreate } from "@api/friend";
import { userSearch } from "@api/user";
import UserProfileInline from "@components/molecules/UserProfileInline";
import { SearchkeywordState, SearchResultState } from "@stores/search";
import {
  updateToastForError,
  updateToastForLoading,
  updateToastForSuccess,
} from "@utils/updateToast";
import React, { FC } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";

interface SearchResultProps {}

const SearchResult: FC<SearchResultProps> = () => {
  const keyword = useRecoilValue(SearchkeywordState);
  const [response, setResponse] = useRecoilState(SearchResultState);

  async function searchUser() {
    const request = new SearchRequest();
    request.setSearchKeyword(keyword);
    const readResponse = await userSearch(request);
    setResponse(readResponse.getUsersList());
  }

  async function createFriend(receiverId: number) {
    const id = updateToastForLoading();
    const request = new FriendCreateRequest();
    request.setReceiverId(receiverId);
    try {
      await friendCreate(request);
      updateToastForSuccess(id, "친구 신청을 보냈습니다.");
      await searchUser();
    } catch (e: any) {
      updateToastForError(id, e.message);
    }
  }

  return (
    <div className="w-full">
      {response.map((user) => (
        <UserProfileInline user={user} key={user.getId()}>
          {
            <div
              className="absolute top-3 right-3 font-semibold text-blue-400"
              onClick={() => createFriend(user.getId())}
            >
              친구 신청
            </div>
          }
        </UserProfileInline>
      ))}
    </div>
  );
};

export default SearchResult;
