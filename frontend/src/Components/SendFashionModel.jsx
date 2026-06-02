import { useUser } from "@/contexts/UserContext"
import axios from "axios"
import FormData from "form-data"
import React, { useState } from "react"

const SendFashionModel = () => {
    const [modelImage, setModelImage] = useState(null)
    const [dressImage, setDressImage] = useState(null)

    const { user } = useUser()

    async function handleModelChange(e) {
        const file = e.target.files[0]
        if (file) {
            setModelImage(file)
        }
    }

    async function handleDressChange(e) {
        const file = e.target.files[0]
        if (file) {
            setDressImage(file)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("modelImg", modelImage)
        formData.append("dressImg", dressImage)
        formData.append("userId", user.$id)
        formData.append("userEmail", user.email)
        formData.append("numberOfImages", 2)

        await axios.post(`${import.meta.env.VITE_API_URL}/fal/fashion`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }

    return (
        <div>
            <h1>Send Fashion Model</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <label htmlFor="modelImage">Upload Model Image:</label>
                <input
                    type="file"
                    id="modelImage"
                    accept="image/*"
                    onChange={handleModelChange}
                />

                <br />
                <label htmlFor="dressImage">Upload Dress Image:</label>
                <input
                    type="file"
                    id="dressImage"
                    accept="image/*"
                    onChange={handleDressChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SendFashionModel
