import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        muted: "#657286",
        panel: "#ffffff",
        soft: "#f4f7fb",
        line: "#dce4ef",
        brand: "#2563eb"
      }
    }
  },
  plugins: []
};

export default config;
