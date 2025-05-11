/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb'
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed'
        },
        accent: '#f97316',
        surface: {
          50: '#f8fafc',   // Lightest
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',  // Added
          500: '#64748b',  // Added
          600: '#475569',  // Added
          700: '#334155',  // Added
          800: '#1e293b',  // Added
          900: '#0f172a'   // Darkest
        }      
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      }
    }  
  },
  theme: {
    extend: {
      // ... existing theme extension
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #3b82f6, #2563eb)',
        'gradient-primary-vertical': 'linear-gradient(to bottom, #3b82f6, #2563eb)',
        'gradient-secondary': 'linear-gradient(to right, #8b5cf6, #7c3aed)',
        'gradient-secondary-vertical': 'linear-gradient(to bottom, #8b5cf6, #7c3aed)',
        'gradient-accent': 'linear-gradient(to right, #f97316, #ea580c)',
        'gradient-light': 'linear-gradient(to right, #f8fafc, #e2e8f0)',
        'gradient-light-vertical': 'linear-gradient(to bottom, #f8fafc, #e2e8f0)',
        'gradient-dark': 'linear-gradient(to right, #1e293b, #0f172a)',
        'gradient-dark-vertical': 'linear-gradient(to bottom, #1e293b, #0f172a)',
        'gradient-blue-purple': 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'gradient-orange-red': 'linear-gradient(135deg, #f97316, #ef4444)'
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}