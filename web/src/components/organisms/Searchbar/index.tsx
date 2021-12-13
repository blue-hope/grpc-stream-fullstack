import { SearchRequest } from "@api/_proto/grpc/qhat/user/message_pb";
import { userSearch } from "@api/user";
import ImageWrapper from "@components/atoms/Image";
import { SearchkeywordState, SearchResultState } from "@stores/search";
import React, { FC } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface SearchbarProps {}

const Searchbar: FC<SearchbarProps> = () => {
  const [keyword, setKeyword] = useRecoilState(SearchkeywordState);
  const setResponse = useSetRecoilState(SearchResultState);

  async function searchUser(keyword: string) {
    const request = new SearchRequest();
    request.setSearchKeyword(keyword);
    const readResponse = await userSearch(request);
    setKeyword(keyword);
    setResponse(readResponse.getUsersList());
  }

  return (
    <div className="pt-5 relative mx-auto text-gray-600">
      <input
        className="w-full border-2 border-gray-200 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-red-400"
        name="search"
        placeholder="이메일로 친구 찾기"
        onChange={(e) => searchUser(e.target.value)}
        value={keyword}
      />
      <div className="absolute top-7 mt-0.5 right-3">
        <ImageWrapper
          src="/icons/icon_searchbar.svg"
          width="15px"
          height="15px"
        />
      </div>
    </div>
  );
};

export default Searchbar;
