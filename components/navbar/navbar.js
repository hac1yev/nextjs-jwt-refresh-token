"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const token = getCookie("accessToken");
        setAccessToken(token);
    }, []);

    return (
        <div style={{ margin: '40px' }}>
            <ul style={{ display: 'flex', justifyContent: 'center', gap: '30px', listStyle: 'none', fontSize: '20px' }}>
                <li>
                    <Link href='/products'>
                        Products
                    </Link>    
                </li>
                {!accessToken && (
                    <li>
                        <Link href="/login">
                            Login
                        </Link>
                    </li>
                )}
                {accessToken && (
                    <li>
                        <Link href="/profile">
                            Profile
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
