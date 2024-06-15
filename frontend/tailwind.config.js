import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                authBg: 'url(/auth-bg.jpg)',
                greenhouse: 'url(/greenhouse.png)',
            },
        },
    },
    plugins: [daisyui],
    daisyui: { themes: ['emerald'] },
};
