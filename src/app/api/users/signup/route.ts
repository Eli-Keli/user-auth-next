/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';


connect() // connect to the database

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json(); // get the request body
        const {username, email, password} = reqBody; // extract the name, email and password from the request body

        console.log(reqBody); // log the request body for debugging
        
        // check if the user already exists
        const user = await User.findOne({email}); // find a user with the email provided

        if (user) {
            return NextResponse.json({error: 'User already exists'}, {status: 400});
        }

        // hash the password
        const salt = await bcryptjs.genSalt(10); // generate a salt
        const hashedPassword = await bcryptjs.hash(password, salt); // hash the password

        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // save the user to the database
        const savedUser = await newUser.save();
        console.log(savedUser); // log the saved user for debugging

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser
        })
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}