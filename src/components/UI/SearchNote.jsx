import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useRef, useState } from "react";
import { NoteContext } from "../../NoteContext";
import Icon from "./Icon";

const SearchNote = () => {

  const [search, setSearch] = useState(''); 
  const inputSearch = useRef();
  const {getNotes} = useContext(NoteContext);

  const changeInputSearch = () => {
    const enteredSearch = inputSearch.current.value;
    setSearch(enteredSearch);
  };

  const onClickSearch = () => {
    getNotes(search);
  }

  return (
    <div className="flex items-center w-8/12 my-2">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="text-gray-600 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon icon={faSearch} css="text-white" />
        </div>
        <input
          type="text"
          ref={inputSearch}
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
          onChange={changeInputSearch}
        />
      </div>
      <button
        type="submit"
        onClick={onClickSearch}
        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <Icon icon={faSearch} css="text-white w-4 h-4" />
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};

export default SearchNote;
