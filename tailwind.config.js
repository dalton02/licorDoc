/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
    
  theme: {
    extend: {
      fontFamily:{
        roboto:["Merriweather","serif"]
      },
        colors:{
          darkStrong:"#09090b",
          darkMid:"#0e0e10",
          darkWeak:"#131315",
          darkWeak2:"#18181b",
          lightStrong:"#f8f8f9",
          lightMid:"#f0f0f3",
          lightWeak:"#efeff3",
          lightWeak2:"#d6d6e0",
          colorful:"#5f5fb9"
        },
      },
    },
  plugins: [],
}