import styled from "styled-components";
import { useEffect, useState } from "react";

interface Props {
  activePage: number;
  totalPage: number;
  prevPageText: string;
  nextPageText: string;
  handlePageChange: (page: number) => void;
  maxItems: number;
}

export const Paging = ({
  activePage,
  totalPage,
  prevPageText,
  nextPageText,
  handlePageChange,
  maxItems,
}: Props) => {
  const pagingArray = Array.from(
    {
      length: totalPage,
    },
    (item, index) => index,
  );

  const [listNum, setListNum] = useState(1);
  useEffect(() => {
    setListNum(Math.floor(Number((activePage + maxItems - 1) / maxItems)));
  }, [activePage, maxItems]);

  const firPagingArr = Array.from(
    {
      length: maxItems,
    },
    (item, index) => {
      return index;
    },
  );
  const otherPagingArr = Array.from(
    {
      length: maxItems,
    },
    (item, index) => {
      return index + maxItems * (listNum - 1);
    },
  );
  const listNumIndex = listNum === 1 ? firPagingArr : otherPagingArr;

  return (
    <PagingUl>
      <li
        onClick={() => {
          if (activePage !== 1) {
            handlePageChange(activePage - 1);
          }
        }}
        style={activePage === 1 ? { backgroundColor: "#fff7cb" } : {}}
      >
        {prevPageText}
      </li>
      {pagingArray.map((item, index) => {
        if (
          listNumIndex[0] <= index &&
          index <= listNumIndex[listNumIndex.length - 1]
        ) {
          return (
            <li
              key={item}
              id={`${index + 1}`}
              className={index + 1 === activePage ? "activePage" : "page"}
              onClick={() => {
                handlePageChange(index + 1);
              }}
            >
              {index + 1}
            </li>
          );
        }
      })}
      <li
        onClick={() => {
          if (activePage !== pagingArray.length) {
            handlePageChange(activePage + 1);
          }
        }}
        style={
          activePage === pagingArray.length
            ? { backgroundColor: "#fff7cb" }
            : {}
        }
      >
        {nextPageText}
      </li>
    </PagingUl>
  );
};

const PagingUl = styled.ul`
  padding: 0;
  margin: auto;
  margin-top: 50px;
  width: 300px;
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;
  user-select: none;
  & ul,
  li {
    list-style: none;
  }
  & li {
    width: 35px;
    height: 35px;
    text-align: center;
    font-size: 25px;
    border-radius: 5px;
    background-color: ${props => props.theme.pagingButton};
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: ${props => props.theme.activeHoverButton};
    }
  }
  & .activePage {
    color: white;
    background-color: ${props => props.theme.activeHoverButton};
  }

  & li:first-child,
  li:last-child {
    background-color: ${props => props.theme.prevNextButton};
    &:hover {
      background-color: ${props => props.theme.activeHoverButton};
    }
  }
`;
