import { SearchRequest } from "@api/_proto/grpc/qhat/user/message_pb";
import { userSearch } from "@api/user";
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
      <button type="submit" className="absolute right-0 top-0 mt-8 mr-4">
        <svg
          className="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </div>
  );
};

export default Searchbar;
