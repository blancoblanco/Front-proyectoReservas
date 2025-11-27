import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useCategoria } from "../context/CategoriaContext";
import "../css/productoForm.css"; // Puedes reutilizar el mismo CSS o crear uno nuevo

function CategoriaFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const { createCategoria, updateCategoria, getCategoria } = useCategoria();

  // Cargar categoría si es edición
  useEffect(() => {
    async function cargarCategoria() {
      if (params.id) {
        try {
          const cat = await getCategoria(params.id);
          setValue("nombre", cat.nombre);
        } catch (error) {
          console.error("Error al cargar categoría:", error);
        }
      }
    }
    cargarCategoria();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const categoriaData = {
      nombre: data.nombre,
    };

    try {
      if (params.id) {
        await updateCategoria(params.id, categoriaData);
      } else {
        await createCategoria(categoriaData);
      }

      navigate("/categorias");
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Error al crear/actualizar categoría: " + error.message);
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
              placeholder="Digite el nombre de la categoría"
              required
            />
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

export default CategoriaFormPage;
