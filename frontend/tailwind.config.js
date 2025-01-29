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
                imageSec:"  linear-gradient(100.05deg, #F5EEFF 1.21%, #EADCFF 100%);",
                gen:"  linear-gradient(99.27deg, #FF7F95 0.92%, #A749FF 27.63%, #51E8FF 46.39%, #53E7FC 62.14%, #FF9D62 75.04%, #FF9277 87.16%, #FFD1D8 100%);"
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
                gradient: {
                    '0%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                    '100%': { 'background-position': '0% 50%' }
                  },
                  shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                  },
                
            },
            animation: {
                marquee: "marquee var(--duration) infinite linear",
                "marquee-vertical":
                    "marquee-vertical var(--duration) linear infinite",
                gradient: 'gradient 2s ease-out infinite',
                shimmer: "shimmer 2s infinite",
               
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
        
    ],
}

export default config
