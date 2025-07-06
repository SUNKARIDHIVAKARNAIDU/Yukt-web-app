/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // blue-600
        'primary-50': '#EFF6FF', // blue-50
        'primary-100': '#DBEAFE', // blue-100
        'primary-200': '#BFDBFE', // blue-200
        'primary-300': '#93C5FD', // blue-300
        'primary-400': '#60A5FA', // blue-400
        'primary-500': '#3B82F6', // blue-500
        'primary-600': '#2563EB', // blue-600
        'primary-700': '#1D4ED8', // blue-700
        'primary-800': '#1E40AF', // blue-800
        'primary-900': '#1E3A8A', // blue-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#7C3AED', // violet-600
        'secondary-50': '#F5F3FF', // violet-50
        'secondary-100': '#EDE9FE', // violet-100
        'secondary-200': '#DDD6FE', // violet-200
        'secondary-300': '#C4B5FD', // violet-300
        'secondary-400': '#A78BFA', // violet-400
        'secondary-500': '#8B5CF6', // violet-500
        'secondary-600': '#7C3AED', // violet-600
        'secondary-700': '#6D28D9', // violet-700
        'secondary-800': '#5B21B6', // violet-800
        'secondary-900': '#4C1D95', // violet-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#F59E0B', // amber-500
        'accent-50': '#FFFBEB', // amber-50
        'accent-100': '#FEF3C7', // amber-100
        'accent-200': '#FDE68A', // amber-200
        'accent-300': '#FCD34D', // amber-300
        'accent-400': '#FBBF24', // amber-400
        'accent-500': '#F59E0B', // amber-500
        'accent-600': '#D97706', // amber-600
        'accent-700': '#B45309', // amber-700
        'accent-800': '#92400E', // amber-800
        'accent-900': '#78350F', // amber-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FAFBFC', // slate-50
        'surface': '#FFFFFF', // white
        'surface-secondary': '#F8FAFC', // slate-50

        // Text Colors
        'text-primary': '#1F2937', // gray-800
        'text-secondary': '#6B7280', // gray-500
        'text-muted': '#9CA3AF', // gray-400
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#10B981', // emerald-500
        'success-50': '#ECFDF5', // emerald-50
        'success-100': '#D1FAE5', // emerald-100
        'success-200': '#A7F3D0', // emerald-200
        'success-300': '#6EE7B7', // emerald-300
        'success-400': '#34D399', // emerald-400
        'success-500': '#10B981', // emerald-500
        'success-600': '#059669', // emerald-600
        'success-700': '#047857', // emerald-700
        'success-800': '#065F46', // emerald-800
        'success-900': '#064E3B', // emerald-900
        'success-foreground': '#FFFFFF', // white

        'warning': '#F59E0B', // amber-500
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-200': '#FDE68A', // amber-200
        'warning-300': '#FCD34D', // amber-300
        'warning-400': '#FBBF24', // amber-400
        'warning-500': '#F59E0B', // amber-500
        'warning-600': '#D97706', // amber-600
        'warning-700': '#B45309', // amber-700
        'warning-800': '#92400E', // amber-800
        'warning-900': '#78350F', // amber-900
        'warning-foreground': '#FFFFFF', // white

        'error': '#EF4444', // red-500
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-200': '#FECACA', // red-200
        'error-300': '#FCA5A5', // red-300
        'error-400': '#F87171', // red-400
        'error-500': '#EF4444', // red-500
        'error-600': '#DC2626', // red-600
        'error-700': '#B91C1C', // red-700
        'error-800': '#991B1B', // red-800
        'error-900': '#7F1D1D', // red-900
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': '#E5E7EB', // gray-200
        'border-muted': '#F3F4F6', // gray-100
        'border-focus': '#2563EB', // blue-600
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'dropdown': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'elevation': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '200ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
        'custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        'navigation': '100',
        'notification': '150',
        'dropdown': '200',
        'drawer': '250',
        'modal': '300',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-up': 'slideUp 300ms ease-in-out',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}