import type { ReactNode } from 'react';

interface AuthenticationLayoutProps {
  children: ReactNode;
  title: string;
}

export function AuthenticationLayout({ children, title }: AuthenticationLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}