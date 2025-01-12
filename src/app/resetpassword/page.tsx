"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const resetPassword = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("/api/users/resetpassword", { token, password });
            console.log("Password reset success: ", response.data);
            toast.success("Password reset successful");
            router.push("/login");
        } catch (error) {
            console.error(error);
            setError("Failed to reset password");
        }
    };

    // get the token from the url
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-center mb-6">Reset Password</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    onClick={resetPassword}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
}
