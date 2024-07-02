import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/connect";
import { Product } from '../../../models/product';

export async function GET() {
    await connectToDB();

    const products = await Product.find();

    return NextResponse.json({ message: 'Success', products });
};