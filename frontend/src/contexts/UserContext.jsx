<<<<<<< HEAD:frontend/src/configs/contexts/UserContext.jsx
import supabase from "@/configs/supabase"
import { createContext, useContext, useState } from "react"
=======

import { login, signOut } from "@/services/api/authService"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
>>>>>>> dash:frontend/src/contexts/UserContext.jsx

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
        try {
            setLoading(true)
            const userData=await login(email,password)
            localStorage.setItem("userData", JSON.stringify(userData))
            setUser(userData)
            return userData
        } catch (err) {
            setError(err)
        
        } finally {
            setLoading(false)
        }
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
            value={{ user, loading, error, loginUser, logoutUser, setLoading }}
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
