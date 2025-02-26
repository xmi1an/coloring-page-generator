import React, { useState, useRef, useMemo, useEffect } from 'react';
import axios from 'axios';
import GeneratedImage from './GeneratedImage';
import SkeletonLoader from './SkeletonLoader';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

export default function ImageGenerator() {
  const predefinedPrompts = useMemo(() => [
    "A friendly elephant playing with balloons",
    "A magical unicorn in an enchanted garden",
    "A cute dinosaur baking cookies",
    "A happy sun wearing a party hat",
    "A playful dolphin jumping over a rainbow",
    "A sleepy panda eating bamboo",
    "A robot making pizza",
    "A fairy dancing on a mushroom",
    "A space cat exploring the moon",
    "A dragon reading bedtime stories",
    "A bunny planting carrots",
    "A penguin having a beach party",
    "A giraffe playing basketball",
    "A monkey swinging on vines",
    "A butterfly collecting flowers",
    "A puppy playing in autumn leaves",
    "A mermaid teaching fish to swim",
    "A squirrel having a picnic",
    "A friendly ghost baking cupcakes",
    "A wise owl teaching stars to shine",
    "A superhero bear saving the day",
    "A pirate parrot searching for treasure",
    "A robot dinosaur playing soccer",
    "A magical fairy tale castle",
  ], []);

  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSize, setImageSize] = useState("1024x1024");
  const inputRef = useRef(null);

  const generateImage = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImageUrl(null);
    try {
      const apiPrompt = `You make coloring book pages. Black and white outlines of drawings.
            You're a coloring book bot. Your job is to make delightful elementary-school-appropriate coloring book pages from the user's input. You should not respond with any other images. You may ask followup questions. A coloring book page is as follows: Black and white outlines, low complexity. Very simplistic, easy for kids to color in.Always child-appropriate, whimsical themes.
            Here is user input: ${prompt}
            `;
      const response = await axios.post("/api/generate-image", {
        prompt: apiPrompt,
        size: imageSize,
      }, {
        headers: {
          'x-api-key': process.env.OPENAI_API_KEY // Ensure the API key is sent here
        }
      });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = () => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    }
  };

  useKeyboardShortcuts({
    onGenerate: generateImage,
    onDownload: handleDownloadImage,
    inputRef,
    canDownload: !!imageUrl,
    canGenerate: !!prompt && !loading,
  });

  return (
    <div className="google-card p-4 sm:p-6 md:p-8">
      <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            className="google-input w-full pr-28"
            placeholder="Describe your coloring page..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={() => {
              const randomPrompt = predefinedPrompts[Math.floor(Math.random() * predefinedPrompts.length)];
              setPrompt(randomPrompt);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
            type="button"
            title="Generate random prompt"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
              <circle cx="9" cy="15" r="1" fill="currentColor" />
              <circle cx="15" cy="15" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-gray-700 font-medium mb-2">Image Size</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {["1024x1024", "1792x1024", "1024x1792"].map((size) => (
              <button
                key={size}
                className={`size-selector px-4 py-2 rounded-lg border text-sm sm:text-base ${
                  imageSize === size
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                } transition-all duration-200`}
                onClick={() => setImageSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="google-button w-full sm:w-auto"
            onClick={generateImage}
            disabled={loading || !prompt}
          >
            {loading ? (
              <span className="flex items-center">
                <div className="loader mr-2"></div>
                Generating...
              </span>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>

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
  );
}
