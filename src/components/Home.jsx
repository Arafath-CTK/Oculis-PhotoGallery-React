import { useState } from "react";
import HomeBanner from "./HomeBanner";
import CategoriesStrip from "./CategoryStrip";
import ImageGrid from "./ImageGrid";

function Home() {
  // query will store either the text search or a selected category title.
  const [query, setQuery] = useState("");

  return (
    <div className="App">
      <HomeBanner onSearch={setQuery} />
      <CategoriesStrip onCategorySelect={setQuery} />
      <ImageGrid query={query} />
    </div>
  );
}

export default Home;
