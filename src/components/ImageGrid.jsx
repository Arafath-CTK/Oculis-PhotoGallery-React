import { useState, useEffect, useCallback, useRef } from "react";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";

// RECIEVING THE SEARCH QUERY FROM THE Home.jsx
const ImageGrid = ({ query }) => {
  const [images, setImages] = useState([]); // ARRAY FOR STORING THE IMAGES FETCHED THROUGH API CALL
  const [page, setPage] = useState(1); // PAGE NUMBER SET AS 1 INITIALLY
  const [hasMore, setHasMore] = useState(true); // STATE INDICATING THERE IS MORE IMAGES TO BE LOADED - USEFULL FOR PROPER FUNCTIONING OF INFINITE SCROLL
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null); // REFERENCE NODE FOR INTERSECTION OBSERVER
  const [selectedImage, setSelectedImage] = useState(null); // FOR SHOWING IN THE MODAL

  // SETTING THE STATES TO INITIAL STAGE WHEN QUERY CHANGES. BECAUSE, ITS A NEW QUERY - THE PREVIOUSLY FETCHED IMAGES CAN'T BE SHOWN UNDER THIS
  useEffect(() => {
    setImages([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // FUNCTION TO FETCH REGULAR IMAGES
  // USING "useCallback" FOR MEMOIZING THE FUNCTION AND NOT BEING RECREATED FOR EVERY COMPONENT RENDERS UNLESS THE DEPENDENCY CHANGES
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

      setImages((prev) => [...prev, ...data]); //STORING ALREADY EXISTING AND NEW IMAGES IN THE ARRAY FOR INFINITE SCROLL FUNCTIONALITY
      setHasMore(data.length > 0);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  // FUNCTION TO FETCH QUERIED IMAGES. HERE ALSO USED "useCallback" FOR MEMOIZING THE FUNCTION AND GIVING BETTER PERFORMANCE
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

  // FETCHING IMAGES ON BASIS OF WHETHER QUERY EXISTS OR NOT
  useEffect(() => {
    if (query) {
      fetchSearchedImages();
    } else {
      fetchImages();
    }
  }, [page, query]);

  // INTERSECTION OBSERVER SETUP FOR INFINITE SCROLL FUNCTIONALITY
  useEffect(() => {
    // "IntersectionObserver" IS A BROWSER API WHICH LETS YOU KNOW WHEN AN ELEMENT ENTERS OR LEAVES THE VIEWPORT.
    const observer = new IntersectionObserver(
      // "entry" REFERS TO AN "IntersectionObserverEntry" OBJECT IN THE CONTEXT OF THE INTERSECTION OBSERVER API,
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1); // INCREASING THE PAGE NUMBER IF THE CONDITIONS ARE MET
        }
      },
      { threshold: 1.0 } // SETTING THAT 100% OF THE ENTRY ELEMENT HAS TO BE IN THE VIEWPORT
    );

    // SETTING OBSERVER TO WATCH ON THE SENTINAL IF IT EXISTS
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect(); // CLEANUP FOR DISCONNECIION WHEN THE COMPONENT UNMOUNTS OR DEPENDANCY CHANGES
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

      {/*SENTINAL ELEMENT SET FOR OBSERVING THE INTERSECTION */}
      <div ref={sentinelRef} className="h-2 w-full" />

      {/* MODAL */}
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
