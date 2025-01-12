/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const response = await axios.get("/api/users/me");
        console.log(response.data);
        toast.success("User details fetched successfully");
        setData(response.data.data._id);
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
            <h1 className='text-4xl font-bold text-center mb-6'>Profile Page</h1>
            <hr className='w-1/4 my-4 border-gray-300' />
            <h2 className='text-2xl text-center mb-4'>Welcome to your profile page</h2>
            <p className='text-lg mt-4 bg-orange-400 p-2 rounded-md'>
                User ID: {data === "nothing" ? "Nothing" : <Link className="text-blue-600 hover:text-blue-800" href={`/profile/${data}`}>{data}</Link>}
            </p>
            <button
                onClick={logout}
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'
            >
                Get User Details
            </button>
        </div>
    )
}