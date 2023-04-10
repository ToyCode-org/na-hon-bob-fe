import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const makeCategory = (name: string, link: string) => {
  return {
    name,
    link,
  };
};

const categories = [
  makeCategory("글쓰기", "/post/add"),
  makeCategory("마이페이지", "/mypage"),
  makeCategory("레시피", "/"),
  makeCategory("커뮤니티", "/community"),
];

export const MainCategory = () => {
  const router = useRouter();
  return (
    <Category>
      {categories.map((cate, index) => {
        const { name, link } = cate;
        if (index >= 2) {
          return (
            <Link
              key={index}
              href={link}
              style={router.pathname === link ? { color: "gold" } : {}}
            >
              {name}
            </Link>
          );
        }
      })}
    </Category>
  );
};

const Category = styled.nav`
  margin: 0 20px;

  & a {
    margin: 0 10px;
    font-weight: bold;
  }
`;

export const ManuCategory = () => {
  const router = useRouter();

  return (
    <MenuCategory>
      {categories.map((cate, index) => {
        const { name, link } = cate;
        return (
          <Link
            key={index}
            href={link}
            style={router.pathname === link ? { color: "gold" } : {}}
          >
            {name}
          </Link>
        );
      })}
    </MenuCategory>
  );
};

const MenuCategory = styled.nav`
  display: flex;
  flex-direction: column;

  & a {
    padding: 0 15px;
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
  }
`;
