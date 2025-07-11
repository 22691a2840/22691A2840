import { BrowserRouter, Routes, Route } from "react-router-dom";
import UrlForm from "./components/UrlForm";
import Stats from "./pages/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UrlForm />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
