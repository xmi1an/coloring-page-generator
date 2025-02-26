import React from 'react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-70"></div>
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Coloring Book Generator
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Transform your ideas into delightful coloring pages for kids using AI. Create unique, engaging, and educational coloring experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="mr-2">✨</span>
              AI-Powered Generation
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="mr-2">🎨</span>
              Kid-Friendly Designs
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="mr-2">⚡</span>
              Instant Download
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
}
