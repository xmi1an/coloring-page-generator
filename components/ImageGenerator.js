import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
import GeneratedImage from './GeneratedImage';
import SkeletonLoader from './SkeletonLoader';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import ImageGallery from './ImageGallery';

export default function ImageGenerator() {
  const predefinedPrompts = useMemo(() => [
    "A friendly elephant playing with balloons",
    "A magical unicorn in an enchanted garden",
    "A cute dinosaur baking cookies",
    "A happy sun wearing a party hat",
    "A playful dolphin jumping over a rainbow",
  ], []);

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSize, setImageSize] = useState("1024x1024");
  const [savedImages, setSavedImages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('generatedImages');
    if (saved) {
      setSavedImages(JSON.parse(saved));
    }
  }, []);

  const saveImage = useCallback((url, promptText) => {
    if (!predefinedPrompts.includes(promptText)) { // Only save user input
      const newImage = {
        url,
        prompt: promptText,
        timestamp: new Date().toISOString()
      };
      const updatedImages = [newImage, ...savedImages].slice(0, 12);
      setSavedImages(updatedImages);
      localStorage.setItem('generatedImages', JSON.stringify(updatedImages));
    }
  }, [savedImages, predefinedPrompts]);

  const generateImage = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImageUrl(null);
    try {
      const apiPrompt = `You make coloring book pages. Black and white outlines of drawings.
            You're a coloring book bot. Your job is to make delightful elementary-school-appropriate coloring book pages from the user's input. You should not respond with any other images. You may ask followup questions. A coloring book page is as follows: Black and white outlines, low complexity. Very simplistic, easy for kids to color in.Always child-appropriate, whimsical themes.
            Here is user input: ${prompt}`;

      const response = await axios.post("/api/generate-image", {
        prompt: apiPrompt,
        size: imageSize,
      });
      const { imageUrl } = response.data;
      setImageUrl(imageUrl);

      // Save to local storage
      saveImage(imageUrl, prompt);

      // No need to make a separate API call as the image is already saved
      // in the generate-image endpoint
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  useKeyboardShortcuts({
    onGenerate: generateImage,
    inputRef,
    canGenerate: !!prompt && !loading,
  });

  return (
    <div className="space-y-8">
      <div className="adw-card p-6 sm:p-8 animate-fade-in">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              className="adw-input"
              placeholder="Describe your coloring page..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={() => {
                const randomPrompt = predefinedPrompts[Math.floor(Math.random() * predefinedPrompts.length)];
                setPrompt(randomPrompt);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 adw-button-secondary p-2"
              type="button"
              title="Generate random prompt"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm0 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-[--adw-fg-dim] text-sm font-medium mb-2">Image Size</label>
            <div className="grid grid-cols-3 gap-3">
              {["1024x1024", "1792x1024", "1024x1792"].map((size) => (
                <button
                  key={size}
                  className={`adw-button ${
                    imageSize === size ? 'adw-button-primary' : 'adw-button-secondary'
                  }`}
                  onClick={() => setImageSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              className="adw-button adw-button-primary w-full"
              onClick={generateImage}
              disabled={loading || !prompt}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="adw-loading mr-2"></div>
                  Generating...
                </span>
              ) : (
                'Generate Image'
              )}
            </button>
          </div>

          <div className="mt-8">
            {loading ? (
              <SkeletonLoader />
            ) : (
              imageUrl && (
                <GeneratedImage
                  imageUrl={imageUrl}
                  loading={loading}
                />
              )
            )}
          </div>
        </div>
      </div>

      <div className="animate-fade-in">
        <ImageGallery images={savedImages} />
      </div>
    </div>
  );
}
