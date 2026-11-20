import { useState, useEffect } from 'react';

export function useTypingEffect(
  words = [],
  typingSpeed = 85,
  deletingSpeed = 45,
  pauseDuration = 1600
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const nextLength = isDeleting ? text.length - 1 : text.length + 1;
      timeout = setTimeout(
        () => {
          setText(currentWord.slice(0, nextLength));
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
