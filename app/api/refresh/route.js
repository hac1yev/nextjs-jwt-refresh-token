import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/connect";
import { User } from "../../../models/user";
import { verifyRefreshToken } from "../../../lib/auth";
import { SignJWT } from "jose";

export async function POST(req) {
    const { refreshToken } = await req.json();

    const payload = await verifyRefreshToken(refreshToken);
 
    await connectToDB();
    
    const user = await User.findOne({ username: payload.username });

    const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const refreshSecretKey = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);
    
    const newAccessToken = await new SignJWT({ 
        username: user.username 
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30s')
    .sign(jwtSecretKey);

    const newRefreshToken = await new SignJWT({ 
        username: user.username 
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt() 
    .setExpirationTime('1d')
    .sign(refreshSecretKey);

    const response = NextResponse.json({ message: "Login successfully!", newAccessToken, newRefreshToken }, { status: 200 });
    
    return response;
};