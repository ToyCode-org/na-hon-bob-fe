import Head from "next/head";
import { HomeGrid } from "@/components/home/homeGrid";

export default function Home() {
  return (
    <>
      <Head>
        <title>나혼밥 레시피</title>
        <meta name="description" content="자취방 레시피 기록하기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="나혼밥 레시피" />
        <meta property="og:description" content="혼밥 레시피 만들어보자아" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="http://www.mysite.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeGrid />
    </>
  );
}
