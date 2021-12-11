import SearchResult from "@components/organisms/SearchResult";
import Searchbar from "@components/organisms/Searchbar";
import BackgroundTemplate from "@components/templates/BackgroundTemplate";
import React, { FC, useState } from "react";

interface SearchViewProps {}

const SearchView: FC<SearchViewProps> = () => {
  return (
    <BackgroundTemplate title="친구 찾기">
      <Searchbar></Searchbar>
      <SearchResult></SearchResult>
    </BackgroundTemplate>
  );
};

export default SearchView;
