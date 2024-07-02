import SignOutPage from "../../components/signout/signout";
import Link from "next/link";

export default async function RootLayout({ children }) {
  return (
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link style={{ fontSize: '20px', textDecoration: 'underline' }} href="/profile/favorites">My Products</Link>
          {/* <Link style={{ fontSize: '20px', textDecoration: 'underline' }} href="/profile/change-password">Change Password</Link> */}
          <SignOutPage />
        </div>
        {children}
      </div>
  );
}
