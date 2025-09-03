/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../../src/**/*.{js,ts,jsx,tsx}', // Include the main component
    './node_modules/@headlessui/**/*.js',
  ],
  safelist: [
    // All the classes used in the WorkingTestimonials component
    // Layout and positioning
    'relative', 'absolute', 'z-1', 'z-2', 'z-10', 'flex', 'flex-col', 'flex-1', 'grid', 'grid-cols-1', 'lg:grid-cols-[1.1fr_1fr]',
    'items-center', 'justify-center', 'text-center', 'min-w-0', 'flex-shrink-0', 'overflow-hidden',
    // Sizing
    'w-4', 'h-4', 'w-3.5', 'h-3.5', 'w-8', 'h-8', 'w-12', 'h-12', 'w-16', 'h-16', 'w-60', 'h-60', 'w-2.5', 'h-2.5', 'w-1.5', 'h-1.5', 'w-8', 'h-0.5',
    'max-w-7xl', 'max-w-2xl', 'min-h-[320px]', 'min-h-[140px]', 'min-h-screen',
    // Spacing
    'p-0', 'px-2', 'py-1', 'px-3', 'py-1.5', 'px-4', 'py-2.5', 'px-5', 'py-5', 'px-6', 'py-6', 'px-8', 'py-7', 'px-4', 'py-8', 'py-12', 'py-16', 'py-20',
    'mx-auto', 'my-0', 'mb-3', 'mb-4', 'mb-6', 'mb-8', 'mb-10', 'mb-12', 'mt-1', 'mt-1.5', 'mt-auto', 'm-0',
    'gap-0.5', 'gap-1', 'gap-1.5', 'gap-2', 'gap-3', 'gap-4', 'gap-6', 'sm:px-6', 'md:px-8', 'md:py-7', 'md:mb-12', 'lg:px-8', 'lg:gap-6', 'lg:py-20', 'md:py-16',
    // Colors and backgrounds
    'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-slate-50', 'bg-slate-800', 'bg-slate-700', 'bg-emerald-500/3', 'bg-slate-900/3', 'bg-white/98',
    'text-slate-900', 'text-slate-600', 'text-slate-700', 'text-slate-500', 'text-white', 'text-yellow-400', 'text-gray-200', 'text-gray-700', 'text-emerald-500/12',
    'border-slate-200/60', 'border-slate-200/50', 'border-slate-200/80', 'border-gray-100', 'border-gray-200', 'border-white/10', 'border-emerald-500',
    // Gradients
    'bg-gradient-to-b', 'from-gray-50', 'via-white', 'to-white',
    // Typography
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-3xl', 'text-4xl', 'text-5xl', 'md:text-lg', 'md:text-4xl', 'lg:text-5xl',
    'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'leading-relaxed', 'leading-[1.76]', 'tracking-tight', 'antialiased', 'capitalize',
    // Borders and rounded corners
    'border', 'border-2', 'border-b', 'rounded-2xl', 'rounded-xl', 'rounded-md', 'rounded-full', 'border-none',
    // Shadows - Custom shadow utilities
    'shadow-[0_14px_40px_rgba(0,0,0,0.10)]',
    'shadow-[0_10px_30px_rgba(0,0,0,0.06)]',
    'shadow-[0_20px_50px_rgba(0,0,0,0.12)]',
    'shadow-[0_4px_12px_rgba(31,41,55,0.15)]',
    'shadow-[0_8px_24px_rgba(31,41,55,0.25)]',
    'shadow-[0_0_0_3px_rgba(16,185,129,0.15),0_2px_4px_rgba(16,185,129,0.2)]',
    'shadow-md',
    'hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]',
    'hover:shadow-[0_8px_24px_rgba(31,41,55,0.25)]',
    // Effects
    'filter', 'blur-3xl', 'backdrop-blur-sm', 'object-cover', 'cursor-pointer',
    // Transforms
    'translate-x-1/3', 'translate-y-1/3', '-translate-x-1/3', '-translate-y-1/3', 'origin-left', 'transform',
    'scale-102', 'scale-85', 'scale-90', 'scale-97', 'scale-98', 'scale-99', 'hover:scale-105', 'hover:scale-110',
    // Transitions
    'transition-all', 'transition-transform', 'duration-150', 'duration-120', 'duration-200', 'ease-out', 'will-change-transform',
    // Hover states
    'hover:bg-slate-400', 'hover:bg-slate-700',
    // Display utilities
    'inline-flex', 'inline-block', 'block', 'hidden',
    // Line clamps
    'line-clamp-2', 'line-clamp-3', 'line-clamp-4',
    // Opacity
    'opacity-70', 'opacity-85', 'opacity-1',
    // Animation
    'animate-[progress_6s_linear_infinite]',
    // Additional classes for better coverage
    'top-0', 'left-0', 'right-0', 'bottom-0', 'top-4', 'right-4', '-bottom-3', 'sm:px-6', 'lg:px-8',
    // New classes for improved visuals
    'w-2', 'h-2', 'w-3', 'h-3', 'w-2.5', 'h-2.5', 'bg-transparent', 'bg-slate-600', 'hover:bg-emerald-400', 'hover:scale-125', 'hover:scale-110', 'duration-200', 'shadow-sm',
    'shadow-[0_0_0_4px_rgba(16,185,129,0.2),0_3px_6px_rgba(16,185,129,0.3)]', 'to-gray-50',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1e293b',
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5', 
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        }
      },
      scale: {
        '102': '1.02',
        '85': '0.85',
        '90': '0.9',
        '97': '0.97',
        '98': '0.98',
        '99': '0.99',
      },
      lineClamp: {
        2: '2',
        3: '3',
        4: '4',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}