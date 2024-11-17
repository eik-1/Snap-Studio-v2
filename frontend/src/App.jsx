import React from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import Error from "./Components/Error"
import { ImageProvider } from "./contexts/ImageContext"
import { useUser } from "./contexts/UserContext"
import Home from "./Pages/Home"
import LandingPage from "./Pages/LandingPage"
import LandingRootLayout from "./Pages/LandingRootLayout"
import Login from "./Pages/Login"
import Pricing from "./Pages/Pricing"
import RootLayout from "./Pages/RootLayout"
import SavedImageCollection from "./Pages/SavedImageCollection"

function ProtectedRoute({ children }) {
    const { user, loading } = useUser()
    if (loading) return
    if (!user) return <Navigate to="/" replace />
    return children
}

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingRootLayout />,
            errorElement: <Error />,
            children: [
                { index: true, element: <LandingPage /> },
                {
                    path: "/login",
                    element: <Login />,
                    errorElement: <Error />,
                },
                {
                    path: "/pricing",
                    element: <Pricing />,
                    errorElement: <Error />,
                },
            ],
        },
        {
            path: "/home",
            element: (
                <ProtectedRoute>
                    <ImageProvider>
                        <RootLayout />
                    </ImageProvider>
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    element: <Home />,
                    errorElement: <Error />,
                },
                {
                    path: "/home/mycollection",
                    element: <SavedImageCollection />,
                    errorElement: <Error />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}

export default App
