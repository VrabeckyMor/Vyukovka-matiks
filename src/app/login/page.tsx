'use client'

import { signIn, signUp, signOut, useSession } from '@/lib/auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const { data: session, isPending } = useSession() // sjednocené volání hooku
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        try {
            setError(null)

            if (isRegistering) {
                await signUp.email({ email, password, name })
            } else {
                await signIn.email({ email, password })
            }

            setEmail('')
            setPassword('')
            setName('')

            router.push('../')
        } catch (err: any) {
            setError(err?.message || 'Chyba při přihlášení/registraci')
        }
    }

    if (session && session.user?.email) {
        return (
            <div style={{ padding: '2rem' }}>
                <button onClick={() => signOut()}>Odhlásit</button>
            </div>
        )
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '400px' }}>
            <h2>{isRegistering ? 'Registrace' : 'Přihlášení'}</h2>

            {isRegistering && (
                <input
                    type="text"
                    placeholder="Jméno"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
                />
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
            />

            <input
                type="password"
                placeholder="Heslo"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
            />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button onClick={handleSubmit} style={{ marginBottom: '1rem' }}>
                {isRegistering ? 'Registrovat' : 'Přihlásit se'}
            </button>

            <p style={{ fontSize: '0.9rem' }}>
                {isRegistering ? 'Už máš účet?' : 'Nemáš ještě účet?'}{' '}
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    style={{ textDecoration: 'underline' }}
                >
                    {isRegistering ? 'Přihlásit se' : 'Registrovat'}
                </button>
            </p>
        </div>
    )
}
