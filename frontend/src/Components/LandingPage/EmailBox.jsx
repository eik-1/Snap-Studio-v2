import { useState } from "react"
import { useNavigate } from "react-router-dom"

function EmailBox() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    function handleEmailSubmit() {
        navigate("/login", { state: { email: email } })
    }

    return (
        <div className="lg:pl-8 flex justify-center items-center">
            <div className="w-[30rem] overflow-hidden p-[3rem] card card-body bg-transparent shadow-xl border-[10px] border-secondary">
                <div className="absolute top-[1.5rem] right-1 transform rotate-[10deg]">
                    <span className="inline-flex items-center rounded-full bg-green-400 px-2.5 py-0.5 text-sm font-medium text-green-900">
                        Now with Flux Pro Ultra 1.1!
                    </span>
                </div>

                <div className="space-y-6 w-full">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Type your email..."
                        className="input input-bordered w-full"
                    />

                    <button
                        className="w-full btn btn-secondary"
                        onClick={handleEmailSubmit}
                    >
                        Create your AI model +
                    </button>

                    <p className="text-center text-sm text-neutral-content">
                        You can login or sign up
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EmailBox
