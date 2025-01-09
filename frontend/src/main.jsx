import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { UserProvider } from "./contexts/UserContext.jsx"
import { Toaster } from "@/Components/UI/toaster"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserProvider>
            <App />
            <Toaster />
        </UserProvider>
    </StrictMode>,
)