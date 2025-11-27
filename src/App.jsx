import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { ProductoProvider } from "./context/ProductoContext";  // <-- IMPORTANTE
import Menu from "./components/Menu";
import ProtectedRoute from "./ProtectedRoute";
import ProductosFormPage from "./pages/ProductosFormPage";
import ProductosPage from "./pages/ProductosPage";

function App() {
  return (
    <AuthProvider>
      <ProductoProvider>  {/* <-- AQUI */}
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<h1></h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/productos" element={<ProductosPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/add-producto" element={<ProductosFormPage />} />
              <Route path="/producto/:id" element={<h1></h1>} />
              <Route path="/categorias" element={<h1></h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductoProvider>
    </AuthProvider>
  );
}

export default App;
