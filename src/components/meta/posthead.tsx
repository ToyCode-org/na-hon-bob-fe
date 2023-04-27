import Head from "next/head";

interface Props {
  title: string;
  ingredient: string;
  description: string;
}

export const PostHead = ({ title, ingredient, description }: Props) => {
  return (
    <Head>
      <title>나혼밥 레시피</title>
      <meta name="keywords" content={`${title} ${ingredient} ${description}`} />
      <meta name="description" content={`${title} 레시피 기록하기`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="나혼밥 레시피" />
      <meta
        property="og:description"
        content={`${title} 레시피를 만들어보자아`}
      />
      <meta property="og:image" content="/favicon.ico" />
      <meta property="og:url" content="www.na-hon-bob.shop" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
