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
        $id: data.user.id,
    }

    return userData
}
async function signOut() {
    await supabase.auth.signOut()
}
async function signUp(email, password, username) {
    await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: username,
            },
        },
    })
}

export { login, signOut, signUp }
