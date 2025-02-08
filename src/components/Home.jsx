import { useState } from "react";
import HomeBanner from "./HomeBanner";
import CategoriesStrip from "./CategoryStrip";
import ImageGrid from "./ImageGrid";

function Home() {
  const [query, setQuery] = useState(""); // BOTH THE TEXT SEARCH AND CATEGORY SELECTION WILL BE STORED AS "query"

  return (
    <div className="App">
      <HomeBanner onSearch={setQuery} /> {/* PASSING "setQuery" FUNCTION TO HomeBanner */}
      <CategoriesStrip onCategorySelect={setQuery} /> {/* PASSING "setQuery" FUNCTION TO CatergoriesStrip ALSO */}
      <ImageGrid query={query} /> {/* PASSING THE "query" TO THE "ImageGrid" FOR MAKE THE API CALL WITH THE QUERY */}
    </div>
  );
}

export default Home;
