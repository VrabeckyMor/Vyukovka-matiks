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
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ padding: '2rem' }}>
                    <button onClick={() => signOut()}>Odhlásit</button>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ backgroundColor: '#00559b46', padding: '10vh 12vh', width: '75vh', borderRadius: '30px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '5vh', fontWeight: 'bold', marginBottom: '2vh' }}>{isRegistering ? 'REGISTRACE' : 'PŘIHLÁŠENÍ'}</h2>

                {isRegistering && (
                    <input
                        type="text"
                        placeholder="Jméno"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ display: 'block', fontSize: '2.5vh', marginBottom: '2vh', width: '100%', backgroundColor: '#00000035', padding: '1vh', borderRadius: '12px' }}
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ display: 'block', fontSize: '2.5vh', marginBottom: '2vh', width: '100%', backgroundColor: '#00000035', padding: '1vh', borderRadius: '12px' }}
                />

                <input
                    type="password"
                    placeholder="Heslo"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ display: 'block', fontSize: '2.5vh', marginBottom: '2vh', width: '100%', backgroundColor: '#00000035', padding: '1vh', borderRadius: '12px' }}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button onClick={handleSubmit}
                    style={{
                        marginBottom: '2vh', backgroundColor: '#00000020', padding: '1vh 2vh', borderRadius: '12px', fontSize: '2.5vh', cursor: 'pointer', boxShadow: '3px 3px 10px #000000c0', minWidth: '30vh', display: 'block', margin: '0 auto 2vh auto'
                    }}>
                    {isRegistering ? 'REGISTROVAT' : 'PŘIHLÁSIT SE'}
                </button>

                <p style={{ fontSize: '2.3vh', marginTop: '5vh' }}>
                    {isRegistering ? 'Už máš účet?' : 'Nemáš ještě účet?'}{' '}
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        style={{ textDecoration: 'underline', fontSize: '2.3vh', cursor: 'pointer' }}
                    >
                        {isRegistering ? 'Přihlásit se' : 'Registrovat'}
                    </button>
                </p>
            </div>
        </div>
    )
}
