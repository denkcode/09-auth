'use client'
import css from './EditProfilePage.module.css'
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';

const EditProfile = () => {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);

    const [username, setUsername] = useState(user?.username ?? "");

    const handleCancel = () => {
        router.push("/profile");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
            console.log('submitting:', { username });
        const updatedUser = await updateMe({ username });
        console.log('updatedUser:', updatedUser);
        setUser(updatedUser);
        window.location.href = '/profile';
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user?.avatar || 'https://placehold.co/120x120'}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form onSubmit={handleSubmit} className={css.profileInfo}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className={css.input}
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button onClick={handleCancel} type="button" className={css.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default EditProfile;