import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-6">User Authentication App using Next.js</h1>
      <hr className="w-1/4 my-4 border-gray-300" />
      <Image
        src="/nextjs.svg"
        alt="Next.js Logo"
        width={300}
        height={300}
        className="mb-6"
      />
      <div className="space-x-4">
        <Link className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700" href="/login">
          Login
        </Link>
        <Link className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700" href="/signup">
          Sign Up
        </Link>
        <Link className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700" href="/profile">
          Profile
        </Link>
      </div>
    </div>
  );
}
