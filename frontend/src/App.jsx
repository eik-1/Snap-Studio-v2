import React from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import Error from "./Components/Error"
import { ImageProvider } from "./contexts/ImageContext"
import { NavigationProvider } from "./contexts/NavigationContext"
import { useUser } from "./contexts/UserContext"
import Home from "./Pages/Dashboard/Home"
import LandingPage from "./Pages/Landing/LandingPage"
import LandingRootLayout from "./Pages/Landing/LandingRootLayout"
import Login from "./Pages/Landing/Login"
import RootLayout from "./Pages/Dashboard/RootLayout"
import SavedImageCollection from "./Pages/Dashboard/SavedImageCollection"
import TermsOfService from "./Pages/Landing/TermsOfService"
import PrivacyPolicy from "./Pages/Landing/Privacy"
import { useToast } from "@/hooks/use-toast"

function ProtectedRoute({ children }) {
    const { user} = useUser();
    const { toast } = useToast()
  
    if (!user
        
    ) { 
        toast({description: "You need to be logged in to access this page"})
        return <Navigate to="/login" replace />

    }
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
                    path:"/terms",
                    element: <TermsOfService />,
                    errorElement: <Error />,
                },
                {
                    path:"/privacy",
                    element: <PrivacyPolicy />,
                    errorElement: <Error />,
                }
            ],
        },
        {
            path: "/app",
            element: (
                <ProtectedRoute>
                    <ImageProvider>
                        <NavigationProvider>
                            <RootLayout />
                        </NavigationProvider>
                        
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
