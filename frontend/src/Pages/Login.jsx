import { motion } from "framer-motion"
import { AlertCircle, Lock, Mail } from "lucide-react"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Alert, AlertDescription } from "@/Components/UI/alert"
import supabase from "@/configs/supabase"
import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}
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

    const { login } = useUser()
    const { toast } = useToast()
    const navigate = useNavigate()

    async function createUser() {
        try {
            await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: username,
                    },
                },
            })
            setPassword("")
            setIsSignup(false)
            toast({
                description: "Sign Up Successful. Login to continue",
            })
        } catch (error) {
            console.log(error)
            setErrorMessage(error.message || "Failed to create account")
        }
    }

    async function loginUser() {
        try {
            await login(email, password)
            navigate("/home")
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

    /* Form Submission */
    async function handleSubmit(e) {
        e.preventDefault()
        setErrorMessage("")
        if (validateForm()) {
            setLoading(true)
            try {
                if (isSignup) {
                    await createUser()
                } else {
                    await loginUser()
                }
            } catch (err) {
                setErrorMessage(err.message || "An error occurred")
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <motion.div
            className="w-full h-screen p-12 flex flex-col justify-center items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <motion.h2
                        className="text-4xl font-extrabold  mb-2 text-secondary "
                        variants={fadeIn}
                    >
                        SnapSTUDIO
                    </motion.h2>
                    <motion.p
                        className="text-lg text-base-content mb-6"
                        variants={fadeIn}
                    >
                        {isSignup
                            ? "Create a new account"
                            : "Login to your account"}
                    </motion.p>
                </div>

                <motion.form
                    className="space-y-6"
                    variants={fadeIn}
                    onSubmit={handleSubmit}
                >
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
                        className="w-full py-3 bg-neutral text-base-100 rounded-lg hover:bg-neutral/90 transition-colors duration-200"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </motion.form>

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
        </motion.div>
    )
}

export default Login
