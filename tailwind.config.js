const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    'node_modules/@yext/answers-react-components/lib/components/**/*.js'
  ],
  theme: {
    // fontFamily: {
    //   'sans': ['"Proxima Nova"', 'ui-sans-serif', 'system-ui']
    // },
    extend: {
      colors: {
        'primary-600': '#312e81',
        'primary-500': '#818cf8',
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};