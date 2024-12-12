import React from 'react';
import { cn } from '@/utils/cn';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea = ({ label, className, id, ...props }: TextAreaProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-400 mb-2"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={cn(
          'w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default TextArea;