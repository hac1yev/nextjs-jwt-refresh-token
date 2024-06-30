"use server";

import mongoose from "mongoose";

export const connectToDB = async () => {
    const connection = { isConnected: false };

    try {
        if(connection.isConnected) return;
        const db = await mongoose.connect(process.env.DATABASE_URI);
        connection.isConnected = db.connections[0].readyState;

    } catch (error) {
        throw new Error(error);
    }
};