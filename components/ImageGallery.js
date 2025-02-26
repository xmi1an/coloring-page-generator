import React from 'react';
import Image from 'next/image';

export default function ImageGallery({ images }) {
  if (!images || images.length === 0) {
    return (
      <div className="adw-card p-8 text-center">
        <p className="text-[--adw-fg-dim]">No images generated yet. Create your first coloring page above!</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold tracking-tight text-[--adw-fg] text-center mb-12">
        Your Generated Coloring Pages
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="adw-image-card group"
          >
            <div className="aspect-square relative">
              <Image
                src={image.url}
                alt={image.prompt || 'Generated coloring page'}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[--adw-bg] via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform group-hover:translate-y-0">
              <div className="adw-card bg-[--adw-card-bg]/95 backdrop-blur p-4">
                <p className="text-sm font-medium text-[--adw-fg] line-clamp-2">{image.prompt}</p>
                <p className="mt-1 text-xs text-[--adw-fg-dim]">{new Date(image.timestamp).toLocaleDateString()}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="adw-button adw-button-secondary text-xs py-1.5">
                    Download
                  </button>
                  <button className="adw-button adw-button-secondary text-xs py-1.5">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
