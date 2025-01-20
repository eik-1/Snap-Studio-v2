import React from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Error from "./Components/Error"
import { ImageProvider } from "./contexts/ImageContext"
import { NavigationProvider } from "./contexts/NavigationContext"
import { useUser } from "./contexts/UserContext"
import Home from "./Pages/Dashboard/Home"
import RootLayout from "./Pages/Dashboard/RootLayout"
import SavedImageCollection from "./Pages/Dashboard/SavedImageCollection"
import LandingPage from "./Pages/Landing/LandingPage"
import LandingRootLayout from "./Pages/Landing/LandingRootLayout"
import Login from "./Pages/Landing/Login"
import PrivacyPolicy from "./Pages/Landing/Privacy"
import TermsOfService from "./Pages/Landing/TermsOfService"

function ProtectedRoute({ children }) {
    const { user, loading } = useUser()
    if (loading) return
    if (!user) return <Navigate to="/" replace />
    return children
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            staleTime: 1000 * 60 * 5,
        },
    },
})

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
                    path: "/terms",
                    element: <TermsOfService />,
                    errorElement: <Error />,
                },
                {
                    path: "/privacy",
                    element: <PrivacyPolicy />,
                    errorElement: <Error />,
                },
            ],
        },
        {
            path: "/app",
            element: (
                <QueryClientProvider client={queryClient}>
                    <ProtectedRoute>
                        <ImageProvider>
                            <NavigationProvider>
                                <RootLayout />
                            </NavigationProvider>
                        </ImageProvider>
                    </ProtectedRoute>
                </QueryClientProvider>
            ),
            children: [
                {
                    index: true,
                    element: <Home />,
                    errorElement: <Error />,
                },
                {
                    path: "myimages",
                    element: <SavedImageCollection />,
                    errorElement: <Error />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}

export default App
