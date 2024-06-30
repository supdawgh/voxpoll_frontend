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
import { Toaster } from "react-hot-toast";
import HostDetails from "./pages/HostDetails/HostDetails";
import Web from "./pages/Web/Web";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/web" element={<Web/>}></Route> 
          <Route
            path="/event/category/:category"
            element={<CategorizedEvents />}
          />
          <Route
            path="/event/:id"
            element={<EventDetails setShowLogin={setShowLogin} />}
          />
          <Route path="/host" element={<Host setShowLogin={setShowLogin} />} />
          <Route path="/host/event/:id" element={<HostDetails />} />
          <Route path="/host/:id" element={<HostDetails />} />

        </Routes>
      </div>

      <Footer />

      <Toaster />
    </>
  );
};

export default App;
