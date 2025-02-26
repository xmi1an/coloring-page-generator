import { useEffect } from 'react';

export default function useKeyboardShortcuts({
  onGenerate,
  onDownload,
  inputRef,
  canDownload,
  canGenerate
}) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + Enter to generate image
      if ((e.key === 'Enter' && canGenerate)) {
        onGenerate();
      }
      // Ctrl/Cmd + D to download image (when available)
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && canDownload) {
        e.preventDefault();
        onDownload();
      }
      // / to focus input
      if (e.key === '/') {
        inputRef.current.focus();
        e.preventDefault();
      }

    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onGenerate, onDownload, inputRef, canDownload, canGenerate]);
}
