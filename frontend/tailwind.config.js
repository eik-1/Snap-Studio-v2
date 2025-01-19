/** @type {import('tailwindcss').Config} */
const config = {
    darkMode:'class',
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
    
    theme: {    
        extend: {
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
                display: ["Fahkwang", "sans-serif"],
                heading: ["Arima", "sans-serif"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                palette: {
                  light: "#FFEBA5", 
                  lavender: "#A15FFF", 
                  purpleLight: "#8548E0", 
                  purpleDark: "#6C3DD0", 
                  darkText: "#1A1A1A",
                    lightText: "#F2F2F2",
                },
              },
              backgroundImage:{
                serviceone:"linear-gradient(125deg, #FFD47F 16.7%, #FDFABB 71.47%)",
                servicetwo:" linear-gradient(125deg, #0067CF 2.79%, #A4FFFF 98.19%)",
                servicethree:"linear-gradient(125deg, #FF3F6F -6.78%, #FFA0EC 107.12%)",
              },
              screens:{
                s:"480px"
              },
            keyframes: {
                marquee: {
                    from: {
                        transform: "translateX(0)",
                    },
                    to: {
                        transform: "translateX(calc(-100% - var(--gap)))",
                    },
                },
                "marquee-vertical": {
                    from: {
                        transform: "translateY(0)",
                    },
                    to: {
                        transform: "translateY(calc(-100% - var(--gap)))",
                    },
                },
            },
            animation: {
                marquee: "marquee var(--duration) infinite linear",
                "marquee-vertical":
                    "marquee-vertical var(--duration) linear infinite",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
        
    ],
}

export default config
