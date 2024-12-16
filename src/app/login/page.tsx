/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });

    const onLogin = async () => {};


  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-2xl text-center'>Login</h1>
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
            <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'>Login here</button>
            <Link href='/signup'>
                Visit the SignUp page
            </Link>
        </form>
    </div>
  )
}
