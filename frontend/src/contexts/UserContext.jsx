import supabase from "@/configs/supabase"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(
        localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : null,
    )
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function login(email, password) {
        try {
            setLoading(true)
            await supabase.auth.signInWithPassword({ email, password })
            const { data } = await supabase.auth.getUser()
            if (!data.user) {
                throw new Error("Incorrect Email or Password")
            }
            const userData = {
                email: data.user.email,
                name: data.user.user_metadata.name,
                $id: data.user.id,
            }
            localStorage.setItem("userData", JSON.stringify(userData))
            setUser(userData)
            return data.user
        } catch (err) {
            setError(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            localStorage.removeItem("userData")
            await supabase.auth.signOut()
            setUser(null)
        } catch (err) {
            setError(err)
            throw err
        }
    }

    return (
        <UserContext.Provider
            value={{ user, loading, error, login, logout, setLoading }}
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
