/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        h1: ['1.5rem', { lineHeight: '2rem', fontWeight: 700 }],
        h2: ['1.375rem', { lineHeight: '1.875rem', fontWeight: 700 }],
        h3: ['1.25rem', { lineHeight: '1.75rem', fontWeight: 700 }],
        h4: ['1.125rem', { lineHeight: '1.625rem', fontWeight: 700 }],
        subtitle1: ['1rem', { lineHeight: '1.5rem', fontWeight: 700 }],
        subtitle2: ['0.875rem', { lineHeight: '1.375rem', fontWeight: 700 }],
        body1: ['1.125rem', { lineHeight: '1.625rem', fontWeight: 400 }],
        body2: ['1rem', { lineHeight: '1.5rem', fontWeight: 400 }],
        body3: ['0.875rem', { lineHeight: '1.375rem', fontWeight: 400 }],
        caption: ['0.75rem', { lineHeight: '1.25rem', fontWeight: 500 }],
      },
      colors: {
        black: '#181818',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#DDDDDD',
          400: '#BBBBBB',
          500: '#999999',
          600: '#777777',
          700: '#5B5B5B',
          800: '#444444',
          900: '#262626',
        },
        mz: {
          '01': 'linear-gradient(90.35deg, #1853FF 0.21%, #18FFFF 126.45%)',
          '02': 'linear-gradient(135deg, #18FF59 0%, #1853FF 100%)',
        }
      },
      zIndex: {
        modal: 9999,
        toast: 999,
        emojiPicker: 199,
        musicPlayer: 99,
      }
    },
  },
  plugins: [],
};
