import { useState, useEffect, useCallback, useRef } from "react";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";

const ImageGrid = ({ query }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Reset images when query changes
  useEffect(() => {
    setImages([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // Function to fetch regular images
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

  // Function to fetch searched images
  const fetchSearchedImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${query}`,
        {
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );
      const data = await response.json();

      setImages((prev) => [...prev, ...data.results]);
      setHasMore(data.results.length > 0);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, query]);

  // Fetch images based on whether there's a search query
  useEffect(() => {
    if (query) {
      fetchSearchedImages();
    } else {
      fetchImages();
    }
  }, [page, query]);

  // Infinite Scroll Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2  md:grid-cols-3 gap-2 sm:gap-4">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="animate-pulse bg-gray-200 aspect-square rounded-lg"
            />
          ))}

        {images?.length > 0 ? (
          images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={setSelectedImage}
            />
          ))
        ) : (
          <div className="flex justify-center items-center w-full col-span-3">
            <div className="flex justify-center items-center w-full h-[300px] bg-gray-100 mb-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold text-gray-700">
                No images found
              </h1>
            </div>
          </div>
        )}
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
