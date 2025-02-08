import { useState } from "react";
import HomeBanner from "./HomeBanner";
import CategoriesStrip from "./CategoryStrip";
import ImageGrid from "./ImageGrid";

function Home() {
  const [query, setQuery] = useState(""); // BOTH THE TEXT SEARCH AND CATEGORY SELECTION WILL BE STORED AS "query"

  return (
    <div className="App">
      <HomeBanner onSearch={setQuery} />
      <CategoriesStrip onCategorySelect={setQuery} />
      <ImageGrid query={query} />
    </div>
  );
}

export default Home;
