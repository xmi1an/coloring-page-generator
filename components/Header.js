import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/70 border-b border-gray-200/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎨</span>
            <span className="font-bold text-gray-800">Coloring Book AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-1 text-sm text-gray-600">
            <div className="flex items-center px-3 py-1 rounded-md bg-gray-100">
              <kbd className="px-2 py-0.5 text-xs bg-white rounded shadow-sm">⌘/</kbd>
              <span className="ml-2">Focus</span>
            </div>
            <div className="flex items-center px-3 py-1 rounded-md bg-gray-100">
              <kbd className="px-2 py-0.5 text-xs bg-white rounded shadow-sm">⌘↵</kbd>
              <span className="ml-2">Generate</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
