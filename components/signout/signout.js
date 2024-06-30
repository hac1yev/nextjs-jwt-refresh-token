"use client"

import { signOut } from "next-auth/react";

const SignOutPage = () => {
    return (
        <p onClick={() => signOut()} style={{ fontSize: '20px', textDecoration: 'underline', cursor: 'pointer' }}>
            Sign Out
        </p>
    );
};

export default SignOutPage;