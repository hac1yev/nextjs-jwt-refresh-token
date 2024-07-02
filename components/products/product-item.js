"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductItem = ({ products }) => {
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const cookie = document.cookie;
        const arr = cookie.split("=");
        const token = arr[1];

        setAccessToken(token);
    }, [accessToken]);

    const handleSubmit = async (id, e) => {
        e.preventDefault();

        try {
            await axios.post(`/api/favorites/add`, JSON.stringify({ id }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true
            });

            const cookie = document.cookie;
            const arr = cookie.split("=");
            const token = arr[1];

            setAccessToken(token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {products.map(product => (
                <form 
                    key={product._id} 
                    onSubmit={handleSubmit.bind(null,product._id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <li style={{ display: 'flex', gap: '10px', margin: '10px' }}>
                        <input type="hidden" name="id" value={product._id} />
                        <p>{product.title}</p>
                        <p>{product.price}$</p>
                    </li>
                    <button style={{ height: '20px', cursor: 'pointer' }}>Add to favorite</button>
                </form>
            ))}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
};

export default ProductItem;