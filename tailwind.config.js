module.exports = {
  content: [
    "./src/**/*.{html,ts}", // تأكد من أن Tailwind يقرأ جميع الملفات المطلوبة
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: "#F6FCDF",
          secondary: "#31511E",
        },
        font: {
          main: "#859F3D",
          secondary: "#1A1A19",
          third: "#666",
        },
      },
      screens: {
        sm: "480px", // شاشة صغيرة تبدأ من 480px
        md: "840px", // شاشة متوسطة تبدأ من 800px
        lg: "1200px", // شاشة كبيرة تبدأ من 1200px
        xl: "1400px", // شاشة كبيرة جدًا تبدأ من 1400px
      },
    },
  },
  plugins: [],
};
