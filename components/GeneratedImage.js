import React, { useRef } from 'react';
import Image from 'next/image';

export default function GeneratedImage({ imageUrl, loading }) {
  const imageContainerRef = useRef(null);

  const handleDownloadImage = () => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    }
  };

  const handlePrintImage = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Image</title>
          <style>
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #fff;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" alt="Coloring book page" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="mt-4 sm:mt-8">
      <div className="paper-effect paper-texture paper-shadow p-3 sm:p-6 md:p-8 mb-4 sm:mb-6" ref={imageContainerRef}>
        <div className="relative w-full" style={{
          paddingTop: '100%',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <Image
            src={imageUrl}
            alt="Coloring book page"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 800px"
            className="rounded-lg object-contain"
            priority
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-100 to-transparent"></div>
      </div>
      <div className="flex justify-center px-4">
        <button
          className="download-button w-full sm:w-auto flex items-center justify-center space-x-2"
          onClick={handleDownloadImage}
          disabled={loading}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span className="text-sm sm:text-base">Download Image</span>
        </button>
        <button
          className="download-button w-full sm:w-auto flex items-center justify-center space-x-2 ml-2"
          onClick={handlePrintImage}
          disabled={loading}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 9v10a2 2 0 002 2h8a2 2 0 002-2V9m-6 0V3m-6 0h6"
            />
          </svg>
          <span className="text-sm sm:text-base">Print Image</span>
        </button>
      </div>
    </div>
  );
}
