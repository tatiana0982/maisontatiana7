module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
          text3: "var(--global-text-3)"
        },
        footer: {
          background1: "var(--footer-bg-1)",
          text1: "var(--footer-text-1)"
        },
        edittext: {
          text1: "var(--edittext-text-1)"
        },
        button: {
          background1: "var(--button-bg-1)"
        },
        brand: {
          gold: '#BFA575', // A subtle, elegant gold for luxury text
        }
      },
      fontFamily: {
        'hellix': ['Hellix', 'sans-serif'],
        'atacama': ['Atacama Trial', 'serif'],
        'inria': ['Inria Serif', 'serif']
      },
      // --- ADDED FOR SMOOTHER ANIMATION ---
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    }
  },
  plugins: []
};