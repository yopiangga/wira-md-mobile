const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      colors: {
        neutral: {
          100: "#FFFFFF",
          200: "#EBF0F4",
          300: "#E4E9EC",
          400: "#D8DCE0",
          500: "#BABEC1",
          600: "#989B9D",
          700: "#717375",
          800: "#5D5F61",
          900: "#2F2F2F",
          1000: "#0A0A0A",
        },
        primary: {
          main: "#f97316",
          surface: "#fb923c",
          border: "#ea580c",
        },
        secondary: {
          main: "#D33BFE",
          surface: "#D33BFE",
          border: "#D33BFE",
        },
        warning: {
          main: "#FFB323",
          surface: "#FFEAD1",
          border: "#CD7B2E",
          hover: "#BF6919",
          pressed: "#734011",
        },
        danger: {
          main: "#C5341B",
          surface: "#FFF4F2",
          border: "#CB3A31",
          hover: "#BD251C",
          pressed: "#731912",
        },
        success: {
          main: "#43936C",
          surface: "#D1FFE9",
          border: "#B8DBCA",
          hover: "#367A59",
          pressed: "#20573D",
        },
        info: {
          main: "#3267E3",
          surface: "#F0F3FF",
          border: "#B1C5F6",
          hover: "#114CD6",
          pressed: "#11317D",
        },
      },
      boxShadow: {
        s1: "0px 4px 24px 0px rgba(0, 0, 0, 0.06)",
        s2: "0px 8px 72px 0px rgba(15, 23, 42, 0.16)",
        s3: "0px 16px 72px 0px rgba(15, 23, 42, 0.16)",
        s4: "0px 16px 72px 0px rgba(15, 23, 42, 0.16)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  variants: {
    extend: {
      tableLayout: ["hover", "focus"],
    },
    container: {
      center: true,
    },
  },
  // plugins: [require("@tailwindcss/typography")],
};
