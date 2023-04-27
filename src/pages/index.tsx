import { useRef } from "react";
import { HomeGrid } from "@/components/home/homeGrid";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { getPostAll } from "@/redux/slice/postSlice";
import { MainHead } from "@/components/meta/mainhead";

export default function Home() {
  const dispatch = useAppDispatch();
  const { post, isLoading, page, hasNextPage } = useAppSelector(
    state => state.postSlice,
  );

  const getPosts = async () => {
    if (hasNextPage && !isLoading) {
      dispatch(getPostAll(page));
    }
  };

  const observerRef: any = useRef();
  const observer = (node: any) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        getPosts();
      }
    });
    node && observerRef.current.observe(node);
  };
  return (
    <>
      <MainHead />
      <HomeGrid post={post} isLoading={isLoading} observer={observer} />
    </>
  );
}
