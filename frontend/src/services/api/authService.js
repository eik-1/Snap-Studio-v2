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
async function signUp(email, password, username, first_name, last_name) {
    await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: first_name,
                last_name: last_name || "",
                name: username,
            },
        },
    })
}

export { login, signOut, signUp }
