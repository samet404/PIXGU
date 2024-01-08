import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    './public/svg/**/*.tsx',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xxs: '0px',
      // => @media (min-width: 0px) { ... } | Extra extra small devices such as phones and smart watches (0px and up)

      xs: '480px',
      // => @media (min-width: 480px) { ... } | Extra small devices such as phones (480px and up)

      sm: '640px',
      // => @media (min-width: 640px) { ... } | Small devices such as large phones (640px and up)

      md: '768px',
      // => @media (min-width: 768px) { ... } | Medium devices such as tablets (768px and up)

      lg: '1024px',
      // => @media (min-width: 1024px) { ... } | Large devices such as laptops (1024px and up)

      xl: '1280px',
      // => @media (min-width: 1280px) { ... } | Largest devices such as desktops (1280px and up)

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... } | Largest devices such as televisions (1536px and up)
    },

    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        position: 'position 15s ease-in-out infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        position: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        loadingBar: {
          '0%': { width: '10%' },
          '50%': { width: '50%' },
          '75%': { width: '70%' },
        },
      },

      backgroundImage: {
        'google-colors':
          'linear-gradient(to bottom right,#34A853,#4285F4,#EA4335, #FBBC04)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    plugin(function ({ addVariant }) {
      addVariant('feelingCyan', `:is(.feelingCyan &)`)
      addVariant('dark-feelingCyan', `:is(.dark-feelingCyan &)`)
    }),
    require('tailwindcss-animated'),
  ],
} satisfies Config
