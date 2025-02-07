// CategoriesStrip.jsx
import { useState, useEffect } from "react";

const CategoriesStrip = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.unsplash.com/topics?per_page=12&order_by=featured",
          {
            headers: {
              Authorization: `Client-ID ${
                import.meta.env.VITE_UNSPLASH_ACCESS_KEY
              }`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (loading)
    return <div className="text-gray-600 p-4">Loading categories...</div>;

  return (
    <section className="w-full bg-white py-4">
      {" "}
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 px-5 py-2 bg-gray-100 rounded-lg
                          text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all 
                          duration-300 cursor-pointer border border-gray-200 shadow-sm"
              >
                {category.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesStrip;
