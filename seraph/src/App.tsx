import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/home/HomePage";
import ScanPage from "./components/ScanPage";

function App() {
  const handleOpenReport = () => {
    alert("Report submitted! Our team will review this project. Thank you!");
    // Later: open modal, connect to backend, etc.
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Example with fake domain */}
        <Route
          path="/scan"
          element={<ScanPage query="suspicious-defi.app" onOpenReport={handleOpenReport} />}
        />
        {/* Or dynamic: <Route path="/scan/:domain" element={<ScanPage />} /> */}
      </Routes>
    </>
  );
}

export default App;