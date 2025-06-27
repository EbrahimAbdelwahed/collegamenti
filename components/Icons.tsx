
import React from 'react';

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className || "w-8 h-8 text-cyan-400"}
    >
        <path d="M12.378 1.602a.75.75 0 00-.756 0L3.366 6.026A.75.75 0 003 6.75v10.5a.75.75 0 00.366.624l8.256 4.424a.75.75 0 00.756 0l8.256-4.424A.75.75 0 0021 17.25V6.75a.75.75 0 00-.366-.624L12.378 1.602zM12 7.5a.75.75 0 01.75.75v3.66l2.504 1.33a.75.75 0 11-.708 1.332L12 13.52v-5.27a.75.75 0 01.75-.75z" />
    </svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className || "w-6 h-6"}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-11.62A6.01 6.01 0 0012 2.25C6.477 2.25 2 6.727 2 12.25a6.01 6.01 0 0011.62 1.524M12 18a6.01 6.01 0 01-1.5-11.62" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6.01 6.01 0 01-1.5-11.62M12 18h3.75m-3.75 0a.375.375 0 01-.375-.375V15.375m0 2.25a.375.375 0 00.375.375m-3.75 0a.375.375 0 01-.375-.375V15.375m0 2.25a.375.375 0 00.375.375M9 15.375V18m0 0a.375.375 0 01.375-.375M9 15.375a.375.375 0 00-.375-.375m0 0a.375.375 0 01.375.375" />
    </svg>
);

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className || "w-6 h-6"}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className || "w-6 h-6"}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 12.75a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z" />
    </svg>
);

export const DocumentTextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className || "w-6 h-6"}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className || "w-6 h-6"}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72-3.72a1.063 1.063 0 00-1.5 0l-3.72 3.72V19.5a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 017.5 4.5h5.25a2.25 2.25 0 012.25 2.25v4.088l-1.956-1.956a2.25 2.25 0 01-3.182 0l-3.182-3.182a2.25 2.25 0 010-3.182l1.956-1.956a2.25 2.25 0 013.182 0l3.182 3.182zM8.25 8.25h-.01M8.25 10.5h.008v.008H8.25v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);
