const { nextui } = require('@nextui-org/react');
const { withTV } = require('tailwind-variants/transformer');

module.exports = withTV({
  content: [
    './src/renderer/**/*.{js,jsx,ts,tsx,ejs}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // darkMode: true, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    function ({ addUtilities }) {
      const newUtils = {
        '.dir-rtl': {
          direction: 'rtl',
        },
        '.dir-ltr': {
          direction: 'ltr',
        },
      };

      addUtilities(newUtils, ['rtl', 'ltr']);
    },
    nextui()
  ],
});
