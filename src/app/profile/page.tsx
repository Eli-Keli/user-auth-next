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
        setData(response.data.data._id);
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-2xl text-center'>Profile Page</h1>
            <hr 
            className='w-1/4 my-4'
            />
            <h2 className='text-xl'>Welcome to your profile page</h2>

            <p className='text-lg mt-4 bg-orange-400'>User ID: {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link> }</p>

            <button 
            onClick={logout}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
            >
                Logout
            </button>
            <button
            onClick={getUserDetails}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Get User Details
            </button>
        </div>
    )
}