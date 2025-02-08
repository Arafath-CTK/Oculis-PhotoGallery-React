import { useState, useEffect, useCallback, useRef } from "react";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=12`,
        {
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );
      const data = await response.json();
      setImages((prev) => [...prev, ...data]);
      setHasMore(data.length > 0);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} onClick={setSelectedImage} />
        ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="animate-pulse bg-gray-200 aspect-square rounded-lg"
            />
          ))}
      </div>

      <div ref={sentinelRef} className="h-2 w-full" />

      {/* Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default ImageGrid;
