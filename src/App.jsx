import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { ProductoProvider } from "./context/ProductoContext";
import Menu from "./components/Menu";
import ProtectedRoute from "./ProtectedRoute";
import ProductosFormPage from "./pages/ProductosFormPage";
import ProductosPage from "./pages/ProductosPage";
import Dashbord from "./pages/Dashbord";
import { CategoriaProvider } from "./context/CategoriaContext";
import CategoriaFormPage from "./pages/CategoriaFormPage";
import { CarritoProvider } from "./context/CarritoContext";



function App() {
  return (
    <AuthProvider>
      <ProductoProvider>
        <CategoriaProvider>
          <CarritoProvider>
            <BrowserRouter>
              <Menu />
              <Routes>
                <Route path="/" element={<h1></h1>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/productos" element={<ProductosPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/categorias" element={<Dashbord />} />
                  <Route path="/add-categoria" element={<CategoriaFormPage />} />
                  <Route path="/categoria/:id" element={<CategoriaFormPage />} />
                  <Route path="/add-producto" element={<ProductosFormPage />} />
                  <Route path="/producto/:id" element={<ProductosFormPage />} />
                  <Route path="/dashbord" element={<Dashbord />} />
                  <Route path="/carrito" element={<Dashbord />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CarritoProvider>
        </CategoriaProvider>
      </ProductoProvider>
    </AuthProvider>
  );
}

export default App;
