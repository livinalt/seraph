import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ScanPage from "./components/ScanPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage query="" />} />
        {/* <Route path="/results" element={<Results />} /> */}
      </Routes>
    </>
  );
}

export default App;
