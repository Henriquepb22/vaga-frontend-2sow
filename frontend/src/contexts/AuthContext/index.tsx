import { createContext, useState } from 'react'
import { login } from 'logic/requests/auth'
import { toast } from 'react-toastify'
import crypto from 'crypto'

export type AuthContextProps = {
    token: string | null
    authenticated: boolean
    handleLogin: (email: string, password: string) => Promise<void>
}

type AuthProviderProps = {
    children: React.ReactNode
}

const generateToken = (value: string) => {
    const newToken = crypto.createHash('sha256').update(value).digest('hex')
    localStorage.setItem('token', newToken)
    return newToken
}

const initialValue: AuthContextProps = {
    token: localStorage.getItem('token'),
    authenticated: !!localStorage.getItem('token'),
    handleLogin: async () => {}
}

export const AuthContext = createContext(initialValue)

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(initialValue.token)
    const [authenticated, setAuthenticated] = useState(
        initialValue.authenticated
    )

    const handleLogin = async (email: string, password: string) => {
        try {
            const data = await login(email)
            if (data.length) {
                const token = generateToken(data[0].id.toString() + password)
                setToken(token)
                toast.success('Conectado')
                setAuthenticated(true)
            } else {
                toast.error('Email e/ou senha incorretos')
            }
        } catch (error) {
            setAuthenticated(false)
            toast.error(error.response?.data.message || error)
        }
    }

    const value: AuthContextProps = {
        token,
        authenticated,
        handleLogin
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
