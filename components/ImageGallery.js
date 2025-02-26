import React from 'react';
import Image from 'next/image';

export default function ImageGallery({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl">
        <p className="text-gray-500">No images generated yet. Create your first coloring page above!</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Generated Coloring Pages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group bg-white rounded-xl overflow-hidden transition-all duration-300 paper-effect hover:scale-[1.02]"
          >
            <div className="relative aspect-square">
              <Image
                src={image.url}
                alt={image.prompt || 'Generated coloring page'}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-sm truncate">{image.prompt}</p>
              <p className="text-white/70 text-xs mt-1">{new Date(image.timestamp).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
