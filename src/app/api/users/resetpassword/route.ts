/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bycriptjs from "bcryptjs";


connect(); // connect to the database


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;
        console.log("Token: ", token);
        console.log("Password: ", password);

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token", success: true });
        }
        console.log(user);

        const hashedPassword = await bycriptjs.hash(password, 10);
        user.password = hashedPassword; // update the password
        user.forgotPasswordToken = undefined; // remove the token
        user.forgotPasswordTokenExpiry = undefined; // remove the expiry
        await user.save();

        return NextResponse.json({ message: "Password reset successful"}, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}