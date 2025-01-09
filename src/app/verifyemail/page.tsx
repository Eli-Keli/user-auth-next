/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    // verify the email
    const verifyEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    // get the token from the url
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    // verify the email when the token changes or is set
    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Email Verification</h1>
            <h2 className="text-2xl font-semibold bg-orange-500">{token ? `${token}` : "no token"}</h2>

            {
                verified && (
                    <div className="text-green-500 mt-4">
                        <h3 className="text-3xl font-bold">Your email has been verified successfully!</h3>
                        <Link className="text-blue-500 text-2xl" href="/login">
                            Login
                        </Link>
                    </div>
                )
            }

            {
                error && (
                    <div className="text-red-500">
                        <h3>There was an error verifying your email</h3>
                    </div>
                )
            }
        </div>
    )
}