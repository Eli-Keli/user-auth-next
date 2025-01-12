/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await sendEmail({ email: user.email, emailType: "RESET", userId: user._id });

        return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}