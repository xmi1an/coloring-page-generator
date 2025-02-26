import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ImageGenerator from "../components/ImageGenerator";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Head>
        <title>Coloring Book Page Generator</title>
        <meta name="description" content="Create beautiful coloring pages for kids using AI" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <Hero />
        <div className="max-w-4xl mx-auto mt-12">
          <ImageGenerator />
        </div>
      </main>

      <footer className="mt-20 py-8 text-center text-gray-500 text-sm border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <p>Made with ❤️ using AI • Create beautiful coloring pages for kids</p>
      </footer>
    </div>
  );
}
