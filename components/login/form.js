"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = () => {
    const [errMsg,setErrMsg] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const response = await axios.post("/api/auth/login", JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password")
            }));

            if(response?.status === 200) {
                router.push("/");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button>Login</button>
                <Link href="/register">Sign Up</Link>
            </form>
            {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
        </>
    );
};

export default Form;