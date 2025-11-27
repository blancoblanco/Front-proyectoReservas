import { useForm } from "react-hook-form";
import { useProducto } from "../context/ProductoContext";
import "../css/productoForm.css";

function ProductosFormPage() {
  const { register, handleSubmit } = useForm();
  const { createProducto } = useProducto();

  const onSubmit = handleSubmit(async (data) => {
    console.log("ENVIANDO:", data);
    await createProducto(data);
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

          <div className="input-box" style={{ width: "100%" }}>
            <label>Categorías</label>
            <select multiple {...register("categorias")}>
              <option>No hay categorías disponibles</option>
            </select>
            <small>Puedes seleccionar varias categorías (Ctrl + click)</small>
          </div>
        </div>

        <div className="button-container">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default ProductosFormPage;
