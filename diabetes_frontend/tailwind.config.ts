import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],

  theme: {
    extend: {
      colors: {
            ink: {
              DEFAULT: "#a8cabb",
              raised: "#ffffff",
              line: "rgba(51, 23, 23, 0.46)",
              linestrong: "rgba(176, 211, 203, 0.72)",
            },

        paper: {
          DEFAULT: "#031d17",
          muted: "#072f22",
        },

        clinical: {
          DEFAULT: "#80b6ac",
          bright: "#789a91",
          dim: "#DCEFE9",
        },

        signal: {
          high: "#B94A48",
          low: "#2E8B70",
        },
      },

      fontFamily: {
        serif: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },

      letterSpacing: {
        widest2: "0.18em",
      },

      maxWidth: {
        content: "1440px",
      },

      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },

      animation: {
        float: "float 4s ease-in-out infinite",
      },
    },
  },

  plugins: [],
} satisfies Config;
