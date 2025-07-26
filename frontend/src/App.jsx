// App.jsx
import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Footer from "./components/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import NewDocument from "./pages/NewDocument";
import Templates from "./pages/Templates";
import Collaborate from "./pages/Collaborate";
import Favorites from "./pages/Favorites";
import Setting from "./components/setting";

const App = () => {
  const homeRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Navbar
              onHomeClick={() => scrollToSection(homeRef)}
              onFooterClick={() => scrollToSection(footerRef)}
            />
            <div ref={homeRef}>
              <Home />
            </div>
            <div ref={footerRef}>
              <Footer />
            </div>
          </div>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-document" element={<NewDocument />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/collaborate" element={<Collaborate />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/settings" element={<Setting />} />
      
      {/* Fallback route for any unmatched paths */}
    </Routes>
  );
};

export default App;
