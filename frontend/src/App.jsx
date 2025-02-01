import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./auth/protected-route";
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
import LoginPage from "./views/login";
import SignUpPage from "./views/signup";
import UserCarPosts from "./views/userPosts";
import { AuthProvider } from "./auth/auth-provider";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100 justify-content-between">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/carsforsale" element={<CarsForSale />}/>
            <Route path="/sellcar" element={<ProtectedRoute><SellCarPage /></ProtectedRoute>}/>
            <Route path="/about" element={<AboutPage />}/>
            <Route path="/contact" element={<ContactPage />}/>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/viewcar/:id" element={<ViewCarPage />} />
            <Route path="/aiassistant" element={<AIAssistant />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/userPosts" element={<ProtectedRoute><UserCarPosts /></ProtectedRoute>}/>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
