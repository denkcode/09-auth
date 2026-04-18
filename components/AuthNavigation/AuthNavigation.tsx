'use client'
import css from "./AuthNavigation.module.css";
import Link from 'next/link'
import { Fragment } from 'react'
import { useAuthStore } from '@/lib/store/authStore'
import { logout } from '@/lib/api/clientApi'
import { useRouter } from "next/navigation";



const AuthNavigation = () => {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated)
  const user = useAuthStore((state) => state.user)
 const handleLogout = async () => {
  await logout();
  clearIsAuthenticated();
  router.push('/sign-in');
  }
  return (
    <Fragment>
      {isAuthenticated ? <Fragment>
        <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li> 
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button onClick={handleLogout} className={css.logoutButton}>Logout</button>
      </li>
      </Fragment>
      : <Fragment>
        <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li></Fragment>}
        
    </Fragment>
  );
};

export default AuthNavigation;
