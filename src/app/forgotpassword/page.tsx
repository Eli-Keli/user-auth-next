"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post("/api/users/forgotpassword", { email });
            toast.success("Password reset email sent");
            console.log("Password reset email sent: ", response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to send password reset email");
            toast.error("Failed to send password reset email");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-center mb-6">Forgot Password</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    onClick={handleForgotPassword}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                >
                    Send Reset Email
                </button>
            </div>
        </div>
    );
}