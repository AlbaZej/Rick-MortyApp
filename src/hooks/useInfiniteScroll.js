import { useEffect, useRef } from 'react';

const useInfiniteScroll = (fetchMore, hasMore) => {
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          fetchMore();
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.disconnect();
      }
    };
  }, [fetchMore, hasMore]);

  return loader;
};

export default useInfiniteScroll;