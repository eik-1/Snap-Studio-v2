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
                serviceone:"linear-gradient(180deg, #FFBB3B 0%, #FFD891 100%)",
                servicetwo:" linear-gradient(180deg, #544EFF 0%, #8A86FE 100%)",
                servicethree:"linear-gradient(180deg, #FF0066 0%, #FF93BE 100%)",
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
