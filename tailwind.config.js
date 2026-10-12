/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Exact Palette Specifications
          ivory: '#F6F0E7',           // Main background
          white: '#FFFFFF',           // Content surfaces, cards, forms
          
          // Deep Aubergine
          aubergine: {
            DEFAULT: '#35213B',
            deep: '#241629',
            light: '#4A3250',
          },
          'aubergine-deep': '#241629',
          'aubergine-light': '#4A3250',

          // Academy Purple Brand Accents
          purple: {
            DEFAULT: '#9636F5',
            hover: '#8124DE',
            deep: '#7025DB',
            pale: '#F0E5FC',
            subtle: '#FAF5FD',
          },
          'purple-hover': '#8124DE',
          'purple-deep': '#7025DB',
          'purple-pale': '#F0E5FC',
          'purple-subtle': '#FAF5FD',
          'border-purple': '#E2D1F9',

          // Dusty Mauve Supporting Sections
          mauve: {
            DEFAULT: '#E9DDEB',
            light: '#F3EAF4',
            border: '#D8C6DC',
          },
          'mauve-light': '#F3EAF4',
          'mauve-border': '#D8C6DC',

          // Antique Gold Accents
          gold: {
            DEFAULT: '#C5A16A',
            light: '#FAF5EC',
            border: '#DFCEB1',
            deep: '#8A6732',
          },
          'gold-light': '#FAF5EC',
          'gold-border': '#DFCEB1',
          'gold-deep': '#8A6732',

          // Dark Charcoal Body Text
          charcoal: {
            DEFAULT: '#403744',
            muted: '#685D6E',
            light: '#8E8295',
          },
          'charcoal-muted': '#685D6E',
          'charcoal-light': '#8E8295',

          // Borders
          border: '#E5DCD2',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(53, 33, 59, 0.04), 0 1px 2px -1px rgba(53, 33, 59, 0.04)',
        'card': '0 4px 8px -2px rgba(53, 33, 59, 0.05), 0 2px 4px -2px rgba(53, 33, 59, 0.04)',
        'card-hover': '0 12px 20px -4px rgba(53, 33, 59, 0.08), 0 4px 6px -2px rgba(53, 33, 59, 0.04)',
        'elevated': '0 20px 28px -6px rgba(53, 33, 59, 0.10), 0 8px 10px -4px rgba(53, 33, 59, 0.05)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        'fast': '150ms',
        'normal': '200ms',
        'smooth': '250ms',
      }
    },
  },
  plugins: [],
}
