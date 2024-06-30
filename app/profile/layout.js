import SignOutPage from "../../components/signout/signout";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  if(!session) {
    redirect('/login');
  };

  // console.log(session);

  return (
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link style={{ fontSize: '20px', textDecoration: 'underline' }} href="/profile/favorites">My Products</Link>
          <Link style={{ fontSize: '20px', textDecoration: 'underline' }} href="/profile/change-password">Change Password</Link>
          <SignOutPage />
        </div>
        {children}
      </div>
  );
}
