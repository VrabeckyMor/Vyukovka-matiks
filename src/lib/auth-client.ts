import { createAuthClient } from 'better-auth/react'

// Vytvoříme klienta, který vrací metody pro přihlášení, registraci, odhlášení a hook pro session
export const { signIn, signOut, signUp, useSession } = createAuthClient()