import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function ExploreSection() {
  const [globalImages, setGlobalImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalImages();
  }, []);

  const fetchGlobalImages = async () => {
    try {
      const response = await axios.get('/api/images');
      setGlobalImages(response.data);
    } catch (error) {
      console.error('Error fetching global images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight text-[--adw-fg] text-center mb-12">
          Explore Creations
        </h2>
        <div className="adw-card p-8 text-center">
          <div className="adw-loading mx-auto"></div>
          <p className="mt-4 text-[--adw-fg-dim]">Loading amazing creations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold tracking-tight text-[--adw-fg] text-center mb-12">
        Explore Creations
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {globalImages.map((image) => (
          <div
            key={image._id}
            className="adw-image-card group"
          >
            <div className="aspect-square relative">
              <Image
                src={image.imageUrl}
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
                <p className="mt-1 text-xs text-[--adw-fg-dim]">
                  {new Date(image.timestamp).toLocaleDateString()}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="adw-button adw-button-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                      <span>❤️</span>
                      <span>{image.likes}</span>
                    </button>
                    <button className="adw-button adw-button-secondary text-xs py-1.5 px-3">
                      Download
                    </button>
                  </div>
                  <button className="adw-button adw-button-secondary text-xs py-1.5 px-3">
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
