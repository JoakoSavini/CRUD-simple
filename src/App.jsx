import { useState, useEffect } from "react";

function App() {
  // Estado para la lista de productos
  const [productos, setProductos] = useState(() => {
    const data = localStorage.getItem("productos");
    return data ? JSON.parse(data) : [
      { id: 1, nombre: "Monitor", precio: 250, stock: 10 },
      { id: 2, nombre: "Teclado", precio: 50, stock: 25 },
      { id: 3, nombre: "Mouse", precio: 30, stock: 40 },
    ];
  });

  // Estado para manejar el formulario de producto
  const [producto, setProducto] = useState({ nombre: "", precio: "", stock: "", id: null });

  // Guardar en localStorage cuando cambie la lista de productos
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // Agregar o Editar Producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto.nombre || !producto.precio || !producto.stock) return;

    if (producto.id) {
      // Editar producto existente
      setProductos(productos.map(p => (p.id === producto.id ? producto : p)));
    } else {
      // Agregar nuevo producto
      setProductos([...productos, { ...producto, id: Date.now() }]);
    }

    setProducto({ nombre: "", precio: "", stock: "", id: null });
  };

  // Eliminar un producto
  const handleDelete = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  // Editar un producto (llenar formulario con datos existentes)
  const handleEdit = (producto) => {
    setProducto(producto);
  };

  // Eliminar todos los productos
  const handleClearAll = () => {
    setProductos([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventario de Productos</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={producto.precio}
          onChange={(e) => setProducto({ ...producto, precio: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={producto.stock}
          onChange={(e) => setProducto({ ...producto, stock: Number(e.target.value) })}
        />
        <button type="submit">{producto.id ? "Actualizar" : "Agregar"}</button>
      </form>

      <button onClick={handleClearAll} style={{ marginTop: "10px", background: "red", color: "white" }}>
        Eliminar Todos
      </button>

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio} - Stock: {p.stock} 
            <button onClick={() => handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
