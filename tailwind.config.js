module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: "#DBD3D3",
          secondary: "#091057",
        },
        font: {
          main: "#EC8305",
          secondary: "#091057",
          third: "#666",
        },
      },
      screens: {
        sm: "480px",
        md: "840px", 
        lg: "1200px",
        xl: "1400px",
      },
    },
  },
  plugins: [],
};
