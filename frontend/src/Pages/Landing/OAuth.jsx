import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import supabase from "@/services/configs/supabase"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function OAuth() {
    const navigate = useNavigate()
    const { toast } = useToast()
    const { setUser } = useUser()

    useEffect(() => {
        async function handleOAuth() {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser()
            if (userError) {
                throw new Error(userError.message)
            }
            const firstName = user.user_metadata.full_name.split(" ")[0]
            let lastName = user.user_metadata.full_name.split(" ")[1] || ""
            const userData = {
                email: user.email,
                name: user.user_metadata.full_name,
                first_name: firstName,
                last_name: lastName,
                $id: user.id,
                // refresh_token: session.refresh_token,
            }
            localStorage.setItem("userData", JSON.stringify(userData))
            setUser(userData)
            toast({ description: "Logged in successfully" })
        }
        handleOAuth().then(() => navigate("/app"))
    }, [navigate, setUser])

    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl">Logging you in...</h1>
        </div>
    )
}

export default OAuth
