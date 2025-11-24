'use client';

interface BackButtonProps {
  onClick: () => void;
  variant?: 'header' | 'floating';
  text?: string;
}

export default function BackButton({
  onClick,
  variant = 'header',
  text = 'Back to Levels'
}: BackButtonProps) {
  const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    header: "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md hover:shadow-lg focus:ring-primary-500",
    floating: "fixed top-4 right-4 bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl focus:ring-primary-600 z-50 md:hidden"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} hover-lift`}
      aria-label={text}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span>{variant === 'header' ? text : '←'}</span>
    </button>
  );
}