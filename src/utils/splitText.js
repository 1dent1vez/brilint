/**
 * Splits a text string into an array of word objects with calculated delays for stagger animations.
 * @param {string} text - The input text to split.
 * @param {string} className - CSS class name for each word span.
 * @returns {Array<{word: string, key: string, className: string, delay: number}>}
 */
export function splitTextToWords(text, className = 'split-word') {
  if (!text) return [];
  return text.split(/\s+/).filter(Boolean).map((word, i) => {
    return {
      word,
      key: `word-${i}-${word}`,
      className,
      delay: Number((i * 0.08).toFixed(2))
    };
  });
}

/**
 * Splits a text string into an array of character objects with calculated delays for stagger animations.
 * @param {string} text - The input text to split.
 * @param {string} className - CSS class name for each character span.
 * @returns {Array<{word: string, key: string, className: string, delay: number}>}
 */
export function splitTextToChars(text, className = 'split-char') {
  if (!text) return [];
  return text.split('').map((char, i) => {
    return {
      word: char === ' ' ? '\u00A0' : char, // Use non-breaking space for spaces to preserve them visually
      key: `char-${i}`,
      className,
      delay: Number((i * 0.03).toFixed(2))
    };
  });
}
