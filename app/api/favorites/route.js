import { NextResponse } from 'next/server';
import { connectToDB } from '../../../lib/connect';
import { User } from '../../../models/user';
import { getNewAccessToken, verifyJwtToken, verifyRefreshToken } from '../../../lib/auth';

export async function GET(req) {
    await connectToDB();

    const { value: refreshToken } = req.cookies.get("refreshToken") || { value: null };
    const authorizationHeader = req.headers.get('Authorization');
    const arr = authorizationHeader.split(" ");
    const accessToken = arr[1];

    const hasVerifyJwtToken = accessToken && (await verifyJwtToken(accessToken));
    
    if(hasVerifyJwtToken) {
        const { username } = hasVerifyJwtToken;
        
        const user = await User.findOne({ username });
        const favorites = user.favorites;

        return NextResponse.json({ message: 'Success', favorites }, { status: 200 });
    }else{
        const hasVerifiedRefreshToken = refreshToken && (await verifyRefreshToken(refreshToken));
        
        if(hasVerifiedRefreshToken) {
            const { newAccessToken, newRefreshToken } = await getNewAccessToken(refreshToken);

            if(newAccessToken) {
                const { username } = newAccessToken && (await verifyJwtToken(newAccessToken));
                
                
                const user = await User.findOne({ username });
                const favorites = user.favorites;

                const response = NextResponse.json({ message: 'Success', favorites }, { status: 200 })
                
                response.cookies.set({ name: 'accessToken', value: newAccessToken, path: '/' });
                response.cookies.set({ name: 'refreshToken', value: newRefreshToken, path: '/', httpOnly: true, secure: true });

                return response;
            }else{
                return NextResponse.json({ message: 'Can not get access token.' }, { status: 404 });
            }
        }
    }
};