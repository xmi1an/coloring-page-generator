import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import ImageGenerator from "../components/ImageGenerator";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Coloring Book Page Generator</title>
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-2xl w-full">
          <Header />
          <ImageGenerator />
        </div>
      </div>
    </>
  );
}
