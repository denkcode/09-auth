"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import css from './SignUpPage.module.css'
import { register, getMe } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'

const CreateUser = () => {
    const router = useRouter();
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
          await register({ email, password });
          const user = await getMe()
          setUser(user)

                router.push('/profile')
            } catch (error) {
        }
    }
    return ( 
    <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form onSubmit={handleSubmit} className={css.form}>
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
        Register
      </button>
    </div>

    <p className={css.error}>{error}</p>
  </form>
</main>

  );
}
  
 
export default CreateUser


