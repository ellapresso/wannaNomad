import Link from "next/link";

const test = (a: number, b: number) => {
  return a + b;
};

const Index = () => {
  return (
    <div>
      <Link href="/">
        <a>홈</a>
      </Link>
      <Link href="/about">
        <a>소개</a>
      </Link>
      <Link href="/ssr-test">
        <a>ssr</a>
      </Link>
    </div>
  );
};

export default Index;
