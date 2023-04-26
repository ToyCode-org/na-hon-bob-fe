import styled from "styled-components";
import { HomeGrid } from "@/components/home/homeGrid";
import { useState, useEffect, useRef } from "react";
import { postAPI } from "@/api/api";
import { useRouter } from "next/router";
import { Post } from "@/components/post";

export default function SearchPost() {
  const {
    query: { keyword },
  } = useRouter();

  const [searchPost, setSearchPost] = useState<Post[]>([]);
  const infiRef = useRef({
    page: 1,
    hasNextPage: true,
    totalPages: 1,
    isLoading: false,
  });

  const getSearchPost = async (page: number, keyword: string) => {
    const { data } = await postAPI.getSearchPost(page, keyword);
    if (data.totalPages < infiRef.current.page) {
      infiRef.current.hasNextPage = false;
    }
    setSearchPost(prev => [...prev].concat(data.data));
  };

  const observerRef: any = useRef();
  const observer = (node: any) => {
    if (infiRef.current.isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && infiRef.current.hasNextPage) {
        infiRef.current.isLoading = true;
        getSearchPost(infiRef.current.page, keyword as string);
        infiRef.current.page += 1;
      }
      infiRef.current.isLoading = false;
    });
    node && observerRef.current.observe(node);
  };

  useEffect(() => {
    infiRef.current.page = 1;
    infiRef.current.hasNextPage = true;
    setSearchPost([]);
  }, [keyword]);

  return (
    <>
      <HomeGrid
        post={searchPost}
        isLoading={infiRef.current.isLoading}
        observer={observer}
      />
    </>
  );
}
