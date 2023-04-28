import styled from "styled-components";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FormEvents, InputEvent, InputTarget } from "@/components/sign";
import { MainInput } from "@/components/tagsComponents/inputs";
import { useRef } from "react";
import { goSearchPost } from "@/router/router";

export const Search = () => {
  const inputData = useRef("");

  const onChangeHandler = (e: InputEvent) => {
    const target = e.target as InputTarget;
    inputData.current = target.value;
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const searchHandler = (e: FormEvents) => {
    e.preventDefault();
    if (inputData.current === "") {
      alert("내용을 입력해주세요!");
    } else {
      goSearchPost(inputData.current);
    }
  };

  const searchInputHandler = () => {
    setSearchOpen(!searchOpen);
  };

  useEffect(() => {
    if (searchOpen) {
      const searchInput = document.getElementById(
        "searchInput",
      ) as HTMLInputElement;
      searchInput?.focus();
    }
  }, [searchOpen]);

  return (
    <SearchWrap onSubmit={searchHandler}>
      {searchOpen ? (
        <>
          <MainInput
            id="searchInput"
            type="text"
            width="200px"
            height="40px"
            placeholder="내용을 입력해주세요!"
            onChange={onChangeHandler}
            onBlur={searchInputHandler}
          />
          <button>
            <BsSearch />
          </button>
        </>
      ) : (
        <button type="button" onClick={searchInputHandler}>
          <BsSearch />
        </button>
      )}
    </SearchWrap>
  );
};

const SearchWrap = styled.form`
  display: flex;
  align-items: center;
  & input {
    position: absolute;
    transform: translate(-105%, 0%);
    border-radius: 15px;
    transition: 0.3s;
    animation: searchOpen 0.3s;
    @keyframes searchOpen {
      0% {
        width: 0px;
      }
      100% {
        width: 200px;
      }
    }
  }
  & button {
    background: none;
    border: none;
  }
  & svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;
