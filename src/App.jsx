import "./App.css";
import Navbar from "./components/Navbar";
import HomeBanner from "./components/HomeBanner";
import CategoriesStrip from "./components/CategoryStrip";
import ImageGrid from "./components/ImageGrid";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomeBanner />
      <CategoriesStrip />
      <ImageGrid />
    </div>
  );
}

export default App;
