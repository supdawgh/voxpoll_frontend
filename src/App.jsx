import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Event from "./pages/Event/Event";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import EventDetails from "./pages/EventDetails/EventDetails";
import CategorizedEvents from "./pages/CategorizedEvents/CategorizedEvents";
import Host from "./components/Host/Host";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showHost, setShowHost] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {/* {showHost && <Host setShowHost={setShowHost} />} */}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} setShowHost={setShowHost} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route
            path="/event/category/:category"
            element={<CategorizedEvents />}
          />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/host" element={<Host />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
