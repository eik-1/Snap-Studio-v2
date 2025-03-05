import { GoogleOriginal, LinkedinOriginal } from "devicons-react"
import { AlertCircle, Lock, Mail, UserSquare2 } from "lucide-react"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"

import { Alert, AlertDescription } from "@/Components/UI/alert"
import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { loginWithOAuth, signUp } from "@/services/api/authService"

function Login() {
    const location = useLocation()
    const { email: emailFromParams } = location.state || {}

    const [email, setEmail] = useState(emailFromParams)
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [errors, setErrors] = useState({})
    const [isSignup, setIsSignup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const { loginUser } = useUser()
    const { toast } = useToast()
    const navigate = useNavigate()

    async function createUser() {
        try {
            await signUp(email, password, firstName, lastName)
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

        if (isSignup && !firstName) {
            newErrors.firstName = "First Name is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleOAuthLogin(provider) {
        const data = await loginWithOAuth(provider)
        console.log("Data here", data)
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
        <div className="w-full h-max py-6 flex justify-center items-center ">
        <div className="w-full sm:w-1/2 p-6 mx-auto h-max    flex flex-col justify-center items-center border-[1px] rounded-lg bg-white ">
           
                <div className="h-max w-full mx-auto flex flex-col justify-center gap-1">
                    <h2 className="text-2xl font-bold text-center text-purple-600   cursor-pointer">
                        SnapStudio
                    </h2>
                    <p className="text-center   mb-6">
                        {isSignup
                            ? "Create a new account"
                            : "Welcome Back, Login to continue"}
                    </p>
                </div>

                <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                           
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <UserSquare2 size={20} />
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                                errors.firstName
                                                    ? "border-error"
                                                    : "border-gray-300"
                                            }  transition-all duration-200`}
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <Alert
                                            variant="destructive"
                                            className="mt-2"
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>
                                                {errors.firstName}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-base-content mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <UserSquare2 size={20} />
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg border `}
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                      
                        </>
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

                     
                        {!isSignup && <p
                                className="text-sm font-normal mt-2 ml-1 cursor-pointer text-blue-600"
                                onClick={() => navigate("/reset-password")}
                            >
                                Forgot Password ?
                            </p>}
                       

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
                        className="w-full h-12 py-3 flex items-center justify-center  bg-black hover:bg-slate-900 text-white rounded-lg transition-colors duration-200 disabled:bg-slate-900"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading? <RotatingLines
                            strokeWidth="4"
                            animationDuration="0.75"
                            strokeColor="white"
                            height="16"
                            width="16"
                           
                        /> :isSignup ? "Sign Up" : "Login"}
                        
                    </button>
                </form>
                <div className="w-full flex justify-center items-center mt-4 text-base gap-1">
                <p className="text-gray-900 ">{isSignup?"Already have an account?":"New user?"}</p>
                <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-blue-600 hover:underline"
                >
                    {isSignup
                        ? " Login"
                        : "Create account"}
                </button>
                </div>
                
          
            <div className="flex items-center w-full my-4">
                <hr className="w-1/2 h-tiny bg-gray-300 my-2" />
                <span className="mx-4 text-gray-500">OR</span>
                <hr className="w-1/2 h-tiny bg-gray-300 my-2" />
            </div>
            <div className="flex w-full flex-col space-y-4 text-base">
                <button
                    type="button"
                    className="w-full py-3 bg-white text-black rounded-lg transition-colors border duration-200 flex items-center justify-center gap-5"
                    onClick={() => handleOAuthLogin("google")}
                >
                    <GoogleOriginal size={20} />
                    Continue with Google
                </button>
                <button
                    type="button"
                    className="w-full py-3 bg-white text-black rounded-lg border transition-colors duration-200 flex items-center justify-center gap-5"
                    onClick={() => {
                        loginWithOAuth("linkedin_oidc")
                    }}
                >
                    <LinkedinOriginal size={20} />
                    Continue with LinkedIn
                </button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-400">
                © 2025 ALL RIGHTS RESERVED
            </div>
        </div>
        </div>
    )
}

export default Login
