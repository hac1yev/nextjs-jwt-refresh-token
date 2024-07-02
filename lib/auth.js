"use server";

import { jwtVerify } from "jose";
import axios from "axios";

export const verifyJwtToken = async (token) => {
    const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    try {
        const { payload } = await jwtVerify(token, jwtSecretKey);

        return payload;
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = async (token) => {
    const refreshSecretKey = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);

    try {
        const { payload } = await jwtVerify(token, refreshSecretKey);

        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getNewAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post("http://localhost:3000/api/auth/refresh", JSON.stringify({
            refreshToken
        }));

        const newAccessToken = response.data.newAccessToken;
        const newRefreshToken = response.data.newRefreshToken;

        return {
            newAccessToken, 
            newRefreshToken
        };
    } catch (error) {
        console.log(error);
    }
};