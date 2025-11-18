const API_URL = "https://umb-web-taller-204o.onrender.com";

export interface Tarea {
  id: number;
  titulo: string;
  completada: number;
}

export async function obtenerTareas(): Promise<Tarea[]> {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function crearTarea(titulo: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo }),
  });
  return await res.json();
}

export async function actualizarTarea(
  id: number,
  titulo: string,
  completada: number
) {
  await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, titulo, completada }),
  });
}

export async function borrarTarea(id: number) {
  await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
}
