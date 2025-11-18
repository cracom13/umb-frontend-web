import { useEffect, useState } from "react";
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  borrarTarea,
  Tarea,
} from "./api";
import "./App.css";

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    const data = await obtenerTareas();
    setTareas(data);
  }

  async function agregarTarea(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) return alert("Debes escribir un título");

    await crearTarea(titulo);
    setTitulo("");
    cargarTareas();
  }

  async function toggleCompletada(t: Tarea) {
    await actualizarTarea(t.id, t.titulo, t.completada ? 0 : 1);
    cargarTareas();
  }

  async function eliminar(id: number) {
    await borrarTarea(id);
    cargarTareas();
  }

  return (
    <div className="container">
      <h1>Gestión de Tareas</h1>

      <form onSubmit={agregarTarea} className="form">
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul className="lista">
        {tareas.map((t) => (
          <li key={t.id} className={t.completada ? "item completada" : "item"}>
            <span onClick={() => toggleCompletada(t)}>{t.titulo}</span>

            <button onClick={() => eliminar(t.id)} className="btn-delete">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
