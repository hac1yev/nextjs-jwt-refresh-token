"use client";

import { useEffect, useState } from "react";
import ProductItem from "../../components/products/product-item";
import Link from "next/link";
import axios from "axios";

const ProductsPage = () => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        (async function() {
            try {
                const response = await axios.get("/api/products");

                if(response.status === 200) {
                    setProducts(response.data.products);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <ul style={{ display: 'flex', gap: '40px', margin: '20px' }}>
            <Link style={{ fontSize: '18px', textDecoration: 'underline' }} href="/products/add">Add Product</Link>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '10px', height: '200px' }}>
                <ProductItem products={products} />
            </div> 
        </ul>
    );
};

export default ProductsPage;