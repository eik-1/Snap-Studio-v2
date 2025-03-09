import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import { ImageProvider } from "@/contexts/ImageContext"
import { ModelProvider } from "@/contexts/ModelContext"
import { useToast } from "@/hooks/use-toast"
import Settings from "@/Pages/Dashboard/Settings"
import Error from "./Components/Error"
import { NavigationProvider } from "./contexts/NavigationContext"
import { SubscriptionProvider } from "./contexts/SubscriptionContext"
import { UserProvider, useUser } from "./contexts/UserContext"
import Home from "./Pages/Dashboard/Home"
import MyImages from "./Pages/Dashboard/MyImages"
import MyModels from "./Pages/Dashboard/MyModels"
import RootLayout from "./Pages/Dashboard/RootLayout"
import SavedImages from "./Pages/Dashboard/SavedImages"
import Gallery from "./Pages/Landing/Gallery"
import LandingPage from "./Pages/Landing/LandingPage"
import LandingRootLayout from "./Pages/Landing/LandingRootLayout"
import Login from "./Pages/Landing/Login"
import OAuth from "./Pages/Landing/OAuth"
import PrivacyPolicy from "./Pages/Landing/Privacy"
import TermsOfService from "./Pages/Landing/TermsOfService"
import ChangePassword from "./Pages/ResetPassword/ChangePassword"
import ResetPassword from "./Pages/ResetPassword/ResetPassword"

function ProtectedRoute({ children }) {
    const { user } = useUser()
    const { toast } = useToast()

    if (!user) {
        toast({ description: "You need to be logged in to access this page" })
        return <Navigate to="/login" replace />
    }
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
                {
                    path: "/oauth",
                    element: <OAuth />,
                    errorElement: <Error />,
                },
                {
                    path: "/gallery",
                    element: <Gallery />,
                    errorElement: <Error />,
                },
            ],
        },
        {
            path: "/reset-password",
            element: <ResetPassword />,
            errorElement: <Error />,
        },
        {
            path: "/change-password",
            element: <ChangePassword />,
            errorElement: <Error />,
        },
        {
            path: "/app",
            element: (
                <QueryClientProvider client={queryClient}>
                    <ProtectedRoute>
                        <SubscriptionProvider>
                            <ImageProvider>
                                <ModelProvider>
                                    <NavigationProvider>
                                        <RootLayout />
                                    </NavigationProvider>
                                </ModelProvider>
                            </ImageProvider>
                        </SubscriptionProvider>
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
                    element: <MyImages />,
                    errorElement: <Error />,
                },
                {
                    path: "myimages/:category",
                    element: <SavedImages />,
                },
                {
                    path: "mymodels",
                    element: <MyModels />,
                    errorElement: <Error />,
                },
                {
                    path: "settings",
                    element: <Settings />,
                    errorElement: <Error />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}

export default App
