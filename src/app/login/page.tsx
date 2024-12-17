/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Login() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("Login success: ", response.data);
            toast.success("Login successful");
            router.push('/profile');
        } catch (error: any) {
            console.log("Login error: ", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-2xl text-center'>
            {loading ? "Processing..." : "Login"}
        </h1>
        <hr 
        className='w-1/4 my-4'
        />
        <form className='flex flex-col items-center'>
            <input
                id='email'
                type='text'
                placeholder='Email'
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className='p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
            <input
                id='password'
                type='password'
                placeholder='Password'
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className='p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
            <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'>
                {buttonDisabled ? "Fill in the form" : "Login"}
            </button>
            <Link href='/signup'>
                Visit the SignUp page
            </Link>
        </form>
    </div>
  )
}
