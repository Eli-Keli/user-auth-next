/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


connect() // connect to the database

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json(); // get the request body
        const {email, password} = reqBody; // extract the email and password from the request body

        console.log(reqBody); // log the request body for debugging

        // check if the user already exists
        const user = await User.findOne({email}); // find a user with the email provided

        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 404});
        }

        // check if the password is correct
        const validPassword = await bcryptjs.compare(password, user.password); // compare the password with the hashed password

        if (!validPassword) {
            return NextResponse.json({error: 'Invalid password'}, {status: 400});
        }

        // create token data for the user
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        // create a token for the user
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"}); // create a token using the token data and the JWT secret

        // Next Response
        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        });

        // set the token in the cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            path: '/',
        })

        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}