import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState([]); // Estado para guardar los datos de la API
  const [loading, setLoading] = useState(true); // Estado para mostrar si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  // Cambia esta URL para probar diferentes APIs
  const API_URL = "https://api.jikan.moe/v4/anime?q=naruto"; // Ejemplo con Jikan API

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Mostrar "Cargando" antes de hacer la petición
        const response = await fetch(API_URL); // Hacer la solicitud
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`); // Manejar errores HTTP
        }
        const result = await response.json(); // Convertir la respuesta a JSON
        setData(result.data); // Guardar los datos en el estado
      } catch (err) {
        setError(err.message); // Guardar el mensaje de error
      } finally {
        setLoading(false); // Terminar el estado de carga
      }
    };

    fetchData();
  }, [API_URL]); // Se ejecuta cuando cambia la URL de la API

  if (loading) return <h1>Cargando...</h1>; // Mostrar mientras carga
  if (error) return <h1>Error: {error}</h1>; // Mostrar si hay un error

  return (
    <div>
      <h1>Lista de Anime</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {/* Imagen del anime */}
            <img src={item.images.jpg.image_url} alt={item.title || "Imagen"} />
            {/* Título del anime */}
            <h2>{item.title || "Sin título"}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
