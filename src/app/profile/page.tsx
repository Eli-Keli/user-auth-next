/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();

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

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-2xl text-center'>Profile Page</h1>
            <hr 
            className='w-1/4 my-4'
            />
            <h2 className='text-xl'>Welcome to your profile page</h2>
            <button 
            onClick={logout}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
            >
                Logout
            </button>
        </div>
    )
}