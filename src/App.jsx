import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Container from "./pages/Container";
import Process from "./pages/Process";
import GPU from "./pages/GPU";
import Storage from "./pages/Storage";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/container" element={<Container />} />

        <Route path="/process" element={<Process />} />

        <Route path="/gpu" element={<GPU />} />

        <Route path="/storage" element={<Storage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;