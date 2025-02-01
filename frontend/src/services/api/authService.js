import { useUser } from "@/contexts/UserContext"
import supabase from "@/services/configs/supabase"

async function login(email, password) {
    await supabase.auth.signInWithPassword({ email, password })
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
        throw new Error("Incorrect Email or Password")
    }
    const userData = {
        email: data.user.email,
        name: data.user.user_metadata.name,
        first_name: data.user.user_metadata.first_name,
        last_name: data.user.user_metadata.last_name,
        $id: data.user.user_metadata.sub,
    }

    return userData
}
async function signOut() {
    await supabase.auth.signOut()
}
async function signUp(email, password, first_name, last_name) {
    await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: first_name,
                last_name: last_name || "",
             
            },
        },
    })
}
async function loginWithOAuth(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${import.meta.env.VITE_APP_URL}/oauth`,
        },
    })
    if (error) {
        throw new Error(error.message)
    }
    // const {
    //     data: { user },
    //     error: userError,
    // } = await supabase.auth.getUser()
    // if (userError) {
    //     throw new Error(userError.message)
    // }
    // const userData = {
    //     email: user.email,
    //     name: user.user_metadata.name,
    //     first_name: user.user_metadata.first_name,
    //     last_name: user.user_metadata.last_name,
    //     $id: user.user_metadata.sub,
    // }
    // return userData
}

export { login, loginWithOAuth, signOut, signUp }
