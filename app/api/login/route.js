import { connectToDB } from "../../../lib/connect";
import { User } from "../../../models/user";
import { NextResponse } from "next/server";
import { compare } from 'bcrypt';
import { SignJWT } from "jose";

export async function POST(req) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({ error: "Username and password are required!" }, { status: 400 });
    }

    await connectToDB();

    const user = await User.findOne({ username });

    if (!user) {
        return NextResponse.json({ error: "Username doesn't exist!" }, { status: 401 });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid password!" }, { status: 401 });
    }

    const refreshSecretKey = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);
    const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    const accessToken = await new SignJWT({ 
        username 
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30s')
    .sign(jwtSecretKey);

    const refreshToken = await new SignJWT({ 
        username 
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt() 
    .setExpirationTime('1d')
    .sign(refreshSecretKey);

    const response = NextResponse.json({ message: "Login successfully!", accessToken }, { status: 200 });
    
    response.cookies.set({
        name: 'accessToken',
        value: accessToken,
        path: '/',
        httpOnly: true,
        secure: true
    });

    response.cookies.set({
        name: 'refreshToken',
        value: refreshToken,
        path: '/',
        httpOnly: true,
        secure: true
    });
    

    return response;
};