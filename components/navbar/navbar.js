import Link from "next/link";

const Navbar = () => {

    return (
        <div style={{ margin: '40px' }}>
            <ul style={{ display: 'flex', justifyContent: 'center', gap: '30px', listStyle: 'none', fontSize: '20px' }}>
                <li>
                    <Link href='/products'>
                        Products
                    </Link>    
                </li>
                <li>
                    <Link href="/login">
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;