/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0B0F1A',
                primary: {
                    glow: '#5EEAD4',
                    accent: '#818CF8',
                },
                status: {
                    error: '#F87171',
                    success: '#34D399',
                },
                surface: '#1F2937',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'neon': '0 0 10px rgba(94, 234, 212, 0.5), 0 0 20px rgba(129, 140, 248, 0.3)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
