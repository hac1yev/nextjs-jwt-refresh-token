"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const FavoritesPage = () => {
    const [accessToken,setAccessToken] = useState("");
    const [favorites,setFavorites] = useState([]);

    useEffect(() => {
        const cookie = document.cookie;
        const arr = cookie.split("=");
        const token = arr[1];

        setAccessToken(token);

        (async function(){
            try {
                const response = await axios.get("/api/favorites", {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    } 
                });

                if(response?.status === 200) {
                    setFavorites(response?.data?.favorites);
                }
            } catch (error) {
                
            }
        })();
    }, [accessToken]);
    

    return (
        <>
            {favorites.map(favorite => (
                <div key={favorite._id}>
                    <h4>Product name: {favorite.title}</h4>
                    <p>Product price: {favorite.price}$</p>
                </div>
            ))}
        </>
    );
};

export default FavoritesPage;