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
        'border-flow': 'border-flow 3s linear infinite',
        'title-shine': 'title-shine 7s linear infinite',

        pulseCard: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounceCard: 'bounce 0.5s infinite',
        'throw': 'throw .5s ease-in-out',
        'fade-blur-bright': 'fade-blur-bright .5 both ease-in',
        'fade-blur': 'fade-blur .5s both ease-in',
        hide: 'hide 0.2s',
        'animate-hosting-room-gradient':
          'hosting-room-gradient 3s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        position: 'position 15s ease-in-out infinite',
        'animate-err-pulse-shadow': 'err-pulse-shadow 3s ease-in-out infinite',
      },
      keyframes: {
        'border-spin': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'title-shine': {
          '0%': {
            'background-position': '400%',
          },
          '100%': {
            'background-position': '-200%',
          },
        },
        throw: {
          '0%': {
            transform: 'translateY(100%) translateX(50%) rotate(90deg) scale(2)',
            opacity: '0',
          },

          '80%': {
            transform: 'translateY(0) translateX(0) rotate(-5deg)  scale(1)',
            opacity: '1',
          },

          '100%': {
            boxShadow: 'box-shadow: 0px 0px 50px -11px #000000;'
          },
        },
        hide: {
          from: {
            display: 'flex',
          },
          to: {
            opacity: '0',
          },
        },
        'fade-blur': {
          '0%': {
            filter: 'blur(20px)',
            opacity: '0',
          },

          '100%': {
            opacity: '1',
          },
        },
        'fade-blur-bright': {
          '0%': {
            filter: 'blur(20px)',
            opacity: '0',
          },

          '100%': {
            opacity: '1',
          },
        },

        'hide-down': {
          from: {
            display: 'block',
          },
          to: {
            transform: 'translateY(40px)',
            opacity: '100',
          },
        },
        'pass-input': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: ' 0% 50%',
          },
        },

        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },

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
        'err-pulse-shadow': {
          '0%, 100%': {
            boxShadow: 'none',
          },
          '50%': {
            boxShadow: '0 0px 30px 1px rgba(244,63,94,0.7)',
          },
        },

        'hosting-room-gradient': {
          '0%, 100%': {
            backgroundImage:
              'radial-gradient(20rem at center,#ffffff21, transparent)',
          },
          '50%': {
            backgroundImage:
              'radial-gradient(20rem at center,#ffffff66, transparent)',
          },
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
    require('@tailwindcss/typography'),
    require('tailwindcss-animated'),
    plugin(function ({ addVariant }) {
      addVariant('feelingCyan', `:is(.feelingCyan &)`)
      addVariant('dark-feelingCyan', `:is(.dark-feelingCyan &)`)
    }),
  ],
} satisfies Config
