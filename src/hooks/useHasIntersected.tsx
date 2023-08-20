import { RefObject, useEffect, useState } from "react"

export default function useHasIntersected(ref: RefObject<Element>, options?: IntersectionObserverInit) {
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (hasIntersected || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(entry.isIntersecting);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    }
  }, [ref, hasIntersected, options]);

  return hasIntersected;
}