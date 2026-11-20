import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = { threshold: 0.15, triggerOnce: true }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!options.triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold: options.threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.triggerOnce]);

  return { ref, isVisible };
}
