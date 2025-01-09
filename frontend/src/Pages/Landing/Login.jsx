import { AlertCircle, Lock, Mail } from "lucide-react"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Alert, AlertDescription } from "@/Components/UI/alert"
import { useUser } from "@contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { signUp } from "@/services/api/authService"

function Login() {
    const location = useLocation()
    const { email: emailFromParams } = location.state || {}

    const [email, setEmail] = useState(emailFromParams)
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [errors, setErrors] = useState({})
    const [isSignup, setIsSignup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const { loginUser } = useUser()
    const { toast } = useToast()
    const navigate = useNavigate()

    async function createUser() {
        try {
            await signUp(email, password, username)
            setPassword("")
            setIsSignup(false)
            toast({
                description:
                    "Sign Up Successful. Please check your email to verify your account",
            })
        } catch (error) {
            console.log(error)
            setErrorMessage(error.message || "Failed to create account")
        }
    }

    async function login() {
        try {
            await loginUser(email, password)
            navigate("/app")
        } catch (error) {
            setErrorMessage(error.message || "Failed to login")
        }
    }

    /* Form Validation */
    function validateForm() {
        const newErrors = {}

        if (!email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid"
        }

        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long"
        }

        if (isSignup && !username) {
            newErrors.username = "Username is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setErrorMessage("")
        if (validateForm()) {
            setLoading(true)
            try {
                if (isSignup) {
                    await createUser()
                } else {
                    await login()
                }
            } catch (err) {
                setErrorMessage(err.message || "An error occurred")
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="w-full sm:w-1/2  mx-auto h-max px-4 py-6 my-40 sm:my-20  flex flex-col justify-center items-center border-[1px] rounded-lg bg-white ">
            <div className="w-full max-w-md">
                <div className="h-max w-max mx-auto flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-center text-purple-600   cursor-pointer">
                        SnapSTUDIO
                    </h2>
                    <p className="text-lg  mb-6">
                        {isSignup
                            ? "Create a new account"
                            : "Welcome Back, Login to continue"}
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {isSignup && (
                        <div>
                            <label className="block text-sm font-medium text-base-content mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Mail size={20} />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                        errors.username
                                            ? "border-error"
                                            : "border-gray-300"
                                    }  transition-all duration-200`}
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            {errors.username && (
                                <Alert variant="destructive" className="mt-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {errors.username}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-base-content mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Mail size={20} />
                            </span>
                            <input
                                type="email"
                                placeholder="Email"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
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
                                <AlertDescription>
                                    {errors.email}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock size={20} />
                            </span>
                            <input
                                type="password"
                                placeholder="Password"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                    errors.password
                                        ? "border-error"
                                        : "border-gray-300"
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {errors.password && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {errors.password}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                    {errorMessage && (
                        <Alert variant="destructive" className="mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3  bg-neutral bg-black text-white rounded-lg hover:bg-neutral/90 transition-colors duration-200"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>

                <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="w-full mt-4 text-blue-600 hover:underline"
                >
                    {isSignup
                        ? "Already have an account? Login"
                        : "Create new account"}
                </button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-400">
                © 2025 ALL RIGHTS RESERVED
            </div>
        </div>
    )
}

export default Login
