'use client'
import css from './SignInPage.module.css'
import { login, getMe } from '@/lib/api/ClientApi'
import { APIError } from '@/app/api/api';
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'

const SignIn = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const setUser = useAuthStore((state) => state.setUser)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            const form = event.currentTarget
            event.preventDefault()
            const formData = new FormData(form);
            const email = formData.get("email") as string
            const password: string = formData.get("password") as string
    
            setError('')
    
            try {
                await login({ email, password });
                const user = await getMe()
                setUser(user);
                    router.push('/profile')
                } catch (error) {
                setError(
                    (error as APIError).response?.data?.error ??
                    (error as APIError).message ??
                    "Oops... something went wrong",
                );
            }
        }

    return (
        <main className={css.mainContent}>
 <form onSubmit={handleSubmit} className={css.form}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

    <p className={css.error}>{error}</p>
  </form>
</main>

    )
}

export default SignIn