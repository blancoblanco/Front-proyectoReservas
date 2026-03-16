import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useProducto } from "../context/ProductoContext";
import { getCategoriasRequest } from "../api/categoria";
import "../css/productoForm.css";

function ProductosFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const { createProducto, updateProducto, getProducto } = useProducto();

  const [categorias, setCategorias] = useState([]);

  // Cargar categorías al montar
  useEffect(() => {
    async function cargarCategorias() {
      try {
        const res = await getCategoriasRequest();
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    }
    cargarCategorias();
  }, []);

  // Cargar producto si es edición
  useEffect(() => {
    async function cargarProducto() {
      if (params.id) {
        try {
          const prod = await getProducto(params.id);

          setValue("nombre", prod.nombre);
          setValue("stock", prod.stock);
          setValue("precio", prod.precio);
          setValue(
            "categorias",
            prod.categorias ? prod.categorias.map((c) => c._id) : []
          );
          setValue("imagen", prod.imagen || "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5721/5721500_sd.jpg");
        } catch (error) {
          console.error("Error al cargar producto:", error);
        }
      }
    }
    cargarProducto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    // Normalizar categorias
    let categoriasArray = data.categorias;
    if (!categoriasArray) {
      categoriasArray = [];
    } else if (!Array.isArray(categoriasArray)) {
      categoriasArray = [categoriasArray];
    }

    // Validar que haya al menos una categoría seleccionada
    if (categoriasArray.length === 0) {
      alert("Debes seleccionar al menos una categoría");
      return;
    }

    // Preparar objeto para enviar al backend
    const productoData = {
      nombre: data.nombre,
      stock: Number(data.stock),
      precio: Number(data.precio),
      categorias: categoriasArray,
      imagen: data.imagen || "", // valor por defecto si no se envía imagen
    };

    console.log("Producto a enviar:", productoData);

    try {
      if (params.id) {
        await updateProducto(params.id, productoData);
      } else {
        await createProducto(productoData);
      }

      navigate("/productos");
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Error al crear/actualizar producto: " + error.message);
    }
  });

  return (
    <div className="producto-form-container">
      <form onSubmit={onSubmit} className="producto-form">
        <div className="content">
          <div className="input-box">
            <label>Nombre</label>
            <input
              type="text"
              {...register("nombre")}
              placeholder="Digite el nombre"
              required
            />
          </div>

          <div className="input-box">
            <label>Stock</label>
            <input
              type="number"
              {...register("stock")}
              placeholder="Digite el stock"
              required
            />
          </div>

          <div className="input-box">
            <label>Precio</label>
            <input
              type="number"
              {...register("precio")}
              placeholder="Digite el precio"
              required
            />
          </div>

          <div className="input-box">
            <label>Imagen (opcional)</label>
            <input
              type="text"
              {...register("imagen")}
              placeholder="URL de la imagen"
            />
          </div>

          <div className="input-box" style={{ width: "100%" }}>
            <label>Categorías</label>
            <select multiple {...register("categorias")} required>
              {categorias.length > 0 ? (
                categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nombre}
                  </option>
                ))
              ) : (
                <option disabled>No hay categorías disponibles</option>
              )}
            </select>
            <small>Puedes seleccionar varias categorías (Ctrl + click)</small>
          </div>
        </div>

        <div className="button-container">
          <button type="submit">
            {params.id ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductosFormPage;
