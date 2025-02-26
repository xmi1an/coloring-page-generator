import React from 'react';

export default function Header() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-2" style={{ color: '#4285f4' }}>
        Coloring Book Generator
      </h1>
      <p className="text-gray-600 text-lg mb-2">
        Create delightful coloring pages for kids
      </p>
      <div className="text-sm text-gray-500">
        Keyboard shortcuts:
        <kbd className="mx-1 px-2 py-1 bg-white rounded shadow">/</kbd> to focus input,
        <kbd className="mx-1 px-2 py-1 bg-white rounded shadow">Ctrl</kbd>+<kbd className="mx-1 px-2 py-1 bg-white rounded shadow">Enter</kbd> to generate...
      </div>
    </div>
  );
}
