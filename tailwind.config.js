module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // Ajoute les chemins nécessaires
  ],
  theme: {
    extend: {
      colors: {
        'petaouchnock-blue-dark': '#003366',
        'petaouchnock-blue': '#0066cc',
        'petaouchnock-green': '#00bfae', // Couleur principale
        'petaouchnock-green-dark': '#008c7d', // Ajoute la version "dark"
      },
    },
  },
  plugins: [],
};
