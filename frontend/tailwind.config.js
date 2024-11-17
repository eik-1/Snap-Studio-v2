/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    daisyui: {
        themes: ["bumblebee", "dark"],
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        logs: true,
        themeRoot: ":root",
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                heading: ["Arima", "sans-serif"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {},
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
        require("daisyui"),
    ],
}

export default config
