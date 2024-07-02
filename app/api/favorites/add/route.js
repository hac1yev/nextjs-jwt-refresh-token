import { NextResponse } from "next/server";
import { User } from "../../../../models/user";
import { getNewAccessToken, verifyJwtToken, verifyRefreshToken } from "../../../../lib/auth";
import { error } from "console";

export async function POST(req) {
    const { id } = await req.json();
    const authorizationHeader = req.headers.get('Authorization');
    const arr = authorizationHeader.split(" ");
    const accessToken = arr[1];

    const { value: refreshToken } = req.cookies.get("refreshToken") || { value: null };
    
    const hasVerifyJwtToken = await verifyJwtToken(accessToken);
    
    if(hasVerifyJwtToken) {
        const { username } = hasVerifyJwtToken;
        const response = NextResponse.json({ message: 'Success' }, { status: 201 });

        await User.updateOne({ username }, { $push: { favorites: id } });

        return response;
    }else{
        const hasVerifiedRefreshToken = refreshToken && (await verifyRefreshToken(refreshToken));
        
        if(hasVerifiedRefreshToken) {
            const { newAccessToken, newRefreshToken } = await getNewAccessToken(refreshToken);

            if(newAccessToken) {
                const { username } = newAccessToken && (await verifyJwtToken(newAccessToken));
                const response = NextResponse.json({ message: 'Success' }, { status: 201 });

                response.cookies.set({ name: 'accessToken', value: newAccessToken, path: '/' });
                response.cookies.set({ name: 'refreshToken', value: newRefreshToken, path: '/', httpOnly: true, secure: true });

                await User.updateOne({ username }, { $push: { favorites: id } });

                return response;
            }else{
                return NextResponse.json({ message: 'Can not get access token.' }, { status: 404 });
            }
        }
    }
};