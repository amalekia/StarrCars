import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Footer from "./components/footer";
import NavigationBar from "./components/navigation-bar";
import CarsForSale from "./views/carsforsale";
import SellCarPage from "./views/sellcar";
import AboutPage from "./views/about";
import ContactPage from "./views/contact";
import NotFoundPage from "./views/errorpage";
import ViewCarPage from "./views/viewcar";
import AIAssistant from "./views/aiassistant";

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 justify-content-between">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/carsforsale" element={<CarsForSale />}/>
          <Route path="/sellcar" element={<SellCarPage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/viewcar/:id" element={<ViewCarPage />} />
          <Route path="/aiassistant" element={<AIAssistant />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
