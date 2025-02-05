import { Alert, AlertDescription } from "@/Components/UI/alert"
import supabase from "@/services/configs/supabase"
import { AlertCircle, Check, Lock } from "lucide-react"
import React, { useState } from "react"

function ChangePassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    function validateForm() {
        const newErrors = {}

        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long"
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required"
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        if (validateForm()) {
            setErrors({})
            try {
                const { error } = await supabase.auth.updateUser({
                    password: confirmPassword,
                })
                if (error) {
                    throw error
                }
            } catch (err) {
                setErrors({ main: "Error updating password" })
            } finally {
                setIsLoading(false)
            }
        }
        if (Object.keys(errors).length === 0) {
            setSuccess(true)
        }
    }

    if (success) {
        return (
            <div className="container h-screen w-full flex justify-center items-center">
                <div className="text-center flex flex-col justify-center p-8 border-2 border-slate-800 ">
                    <h2 className="text-2xl font-bold text-green-500 flex gap-3 items-center">
                        <Check size={30} />
                        Password Updated
                    </h2>
                    <p className="font-light text-sm mt-2 text-slate-600">
                        Go back and login with your new password
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="container h-screen w-full flex justify-center items-center">
            <div className="text-center flex flex-col justify-center p-8 border-2 border-slate-800 ">
                <h2 className="text-2xl font-bold">Change Your Password</h2>

                <form className="mt-5 flex flex-col text-start gap-4">
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
                    <div>
                        <label className="block text-sm font-medium text-base-content mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock size={20} />
                            </span>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                    errors.confirmPassword
                                        ? "border-error"
                                        : "border-gray-300"
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        {errors.confirmPassword && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {errors.confirmPassword}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                    {errors.main && (
                        <Alert variant="destructive" className="mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.main}</AlertDescription>
                        </Alert>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-lg py-3 mt-5 disabled:bg-slate-400"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
