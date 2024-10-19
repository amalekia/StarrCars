import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Footer from "./components/footer";
import NavigationBar from "./components/navigation-bar";
import CarsForSale from "./views/carsforsale";

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 justify-content-between">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/carsforsale" element={<CarsForSale />}/>
          {/* <Route path="/sellcar" element={<SellCarPage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/privacy" element={<PrivacyPage />}/> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
