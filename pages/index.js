import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ImageGenerator from "../components/ImageGenerator";
import ExploreSection from "../components/ExploreSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[--adw-bg]">
      <Head>
        <title>Coloring Book Page Generator</title>
        <meta name="description" content="Create beautiful coloring pages for kids using AI" />
        <link href="https://fonts.googleapis.com/css2?family=Cantarell:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="relative">
        {/* Background decorations */}
        <div className="fixed inset-0 adw-grid-pattern opacity-[0.03] pointer-events-none" />
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, var(--adw-accent-bg) 0%, transparent 70%)',
            opacity: '0.05'
          }}
        />

        <Header />

        <main className="relative">
          <Hero />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
            <ImageGenerator />
            <div className="mt-24 pt-16 border-t border-[--adw-border]">
              <ExploreSection />
            </div>
          </div>
        </main>

        <footer className="mt-16 border-t border-[--adw-border] py-8">
          <div className="text-center">
            <p className="text-sm leading-6 text-[--adw-fg-dim]">
              Made with{' '}
              <span className="text-[--adw-accent]">❤️</span>
              {' '}using AI • Create beautiful coloring pages for kids
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
