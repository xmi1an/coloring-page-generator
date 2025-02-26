import React from 'react';

export default function Hero() {
  return (
    <div className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[--adw-fg] mb-6">
            Coloring Book{' '}
            <span className="relative">
              <span className="relative text-[--adw-accent]">Generator</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[--adw-fg-dim]">
            Create beautiful, AI-powered coloring pages for kids. Transform your ideas into delightful, educational coloring experiences.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="adw-card px-4 py-2 flex items-center gap-3">
              <span className="text-[--adw-accent]">✨</span>
              <span className="text-[--adw-fg-dim]">AI-Powered Generation</span>
            </div>
            <div className="adw-card px-4 py-2 flex items-center gap-3">
              <span className="text-[--adw-accent]">🎨</span>
              <span className="text-[--adw-fg-dim]">Kid-Friendly Designs</span>
            </div>
            <div className="adw-card px-4 py-2 flex items-center gap-3">
              <span className="text-[--adw-accent]">⚡</span>
              <span className="text-[--adw-fg-dim]">Instant Download</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-x-6">
            <div className="adw-card px-4 py-2 flex items-center gap-2">
              <kbd className="px-2 py-1 text-sm rounded bg-[--adw-bg] text-[--adw-accent]">⌘/</kbd>
              <span className="text-[--adw-fg-dim]">to focus</span>
            </div>
            <div className="adw-card px-4 py-2 flex items-center gap-2">
              <kbd className="px-2 py-1 text-sm rounded bg-[--adw-bg] text-[--adw-accent]">⌘↵</kbd>
              <span className="text-[--adw-fg-dim]">to generate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 adw-grid-pattern opacity-[0.03]"></div>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--adw-accent-bg) 0%, transparent 70%)',
            opacity: '0.1'
          }}
        ></div>
      </div>
    </div>
  );
}
