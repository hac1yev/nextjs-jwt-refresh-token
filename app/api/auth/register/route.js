import { connectToDB } from "../../../../lib/connect";
import { hashPassword } from "../../../../lib/hashPassword";
import { User } from "../../../../models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { username,password } = await req.json();

    if(!username || !password) {
        return NextResponse.json({ error: "Username and password are required!" }, { status: 400 });
    }

    await connectToDB();

    const user = await User.findOne({ username });
    
    if(user) {
        return NextResponse.json({ error: "Username already exists!" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await new User({ username, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "Registered successfully!" }, { status: 201 });
};