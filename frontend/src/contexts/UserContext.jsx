import { createContext, useContext, useState } from "react"

import { login, signOut } from "@/services/api/authService"

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(
        localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : null,
    )
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function loginUser(email, password) {
        setLoading(true)
        const userData = await login(email, password)
        localStorage.setItem("userData", JSON.stringify(userData))
        setUser(userData)
        return userData
    }

    async function logoutUser() {
        try {
            localStorage.removeItem("userData")
            await signOut()
            setUser(null)
        } catch (err) {
            setError(err)
            throw err
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                loading,
                error,
                loginUser,
                logoutUser,
                setLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}

export { UserProvider, useUser }
