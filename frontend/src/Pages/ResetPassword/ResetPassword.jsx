import { Alert, AlertDescription } from "@/Components/UI/alert"
import supabase from "@/services/configs/supabase"
import { AlertCircle, CircleCheck, Mail } from "lucide-react"
import { React, useState } from "react"

function ResetPassword() {
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    function validateForm() {
        const newErrors = {}
        if (!email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid"
        }
        setErrors(newErrors)
        console.log(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (validateForm()) {
            setErrors({})
            setLoading(true)
            try {
                const { error } = await supabase.auth.resetPasswordForEmail(
                    email,
                    {
                        redirectTo: `${window.location.origin}/change-password`,
                    },
                )
                if (error) {
                    throw error
                }
                setSuccess(true)
            } catch (err) {
                console.log(err)
                setErrors({ email: "Error sending email" })
            } finally {
                setLoading(false)
            }
        }
    }

    if (success) {
        return (
            <div className="p-4 h-screen w-full flex justify-center items-center">
                <div className="w-full sm:w-3/4 text-center flex flex-col justify-center p-8 border-[1px] rounded-lg gap-4 ">
                    <h2 className="text-lg flex gap-2 items-center font-semibold text-green-600">
                        <CircleCheck size={24} />
                        <span className="text-gray-700 leading-none">
                            Passowrd reset link sent{" "}
                        </span>
                    </h2>
                    <p className="text-left">
                        We've sent a password reset link to your email. Please
                        check your inbox and follow the instructions to reset
                        your password. If you don't see the email, check your
                        spam or junk folder.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen w-full flex justify-center items-center p-4">
            <div className="text-center flex flex-col justify-center p-8 border-[1px] rounded-lg ">
                <h2 className="text-2xl font-bold">Reset your password</h2>
                <p className="font-light text-sm mt-2 text-slate-600">
                    Enter your email and we'll send you a link to get back into
                    your account.
                </p>
                <form className="mt-5">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail size={20} />
                        </span>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${
                                errors.email
                                    ? "border-error"
                                    : "border-gray-300"
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {errors.email && (
                        <Alert variant="destructive" className="mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.email}</AlertDescription>
                        </Alert>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-lg py-3 mt-5 disabled:bg-slate-400"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "sending link" : "Send reset link"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
