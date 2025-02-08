import { useState, useEffect } from "react";

const CategoriesStrip = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]); // INITIALIZED AN ARRAY FOR STORING THE CATEGORY NAMES
  const [loading, setLoading] = useState(true); // LOADING SET TO "TRUE" - USEFULL FOR GIVING PROPER FEEDBACK TO USER.
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      // USING TRY-CATCH FOR BETTER ERROR HANDLING SINCE IT'S A SIDE EFFECT.
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
        setCategories(data); // SETTING THE DATA INTO THE ARRAY THAT INITIALIZED EARLIER
      } catch (err) {
        setError(err.message); // ERROR HANDLING
      } finally {
        setLoading(false); // SINCE WE GOT THE RESULT (EVEN IF IT'S AN ERROR), LOADING SET TO "FALSE"
      }
    };

    fetchCategories();
  }, []); // WILL TRIGGER ONLY FOR ONCE BECAUSE OF AN EMPTY DEPENDENCY ARRAY

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>; // RETURNING A NODE TO SHOW THE ERROR MESSAGE TO THE USER
  if (loading)
    return <div className="text-gray-600 p-4">Loading categories...</div>; // ALSO WHILE LOADING

  return (
    <section className="w-full bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-4">
            {categories.map((category) => ( 
              <div
                key={category.id}
                onClick={() => onCategorySelect(category.title)} // THIS DATA GOING TO THE SEARCH QUERY STATE IN "Home.jsx"
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
