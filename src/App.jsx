import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>productos</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/productos" element={<h1>productos</h1>} />
          <Route path="/add-producto" element={<h1></h1>} />
          <Route path="/producto/:id" element={<h1></h1>} />
          <Route path="/categorias" element={<h1></h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  
  );
}

export default App;
