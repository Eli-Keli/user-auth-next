import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl text-center">User Authentication App using Next.js</h1>
      <hr className="w-1/4 my-4" />
      <Image
        src="/nextjs.svg"
        alt="Next.js Logo"
        width={300}
        height={300}
      />
    </div>
  );
}
