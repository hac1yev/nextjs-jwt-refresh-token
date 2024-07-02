"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = () => {
    const router = useRouter();
    const [error,setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        try {
            const response = await axios.post("/api/auth/register", JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password")
            }));

            if(response?.status === 201) {
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button>Register</button>
            {error.length > 0 && <p>{error}</p>}
        </form>
    );
};

export default Form;