"use client";
import { useEffect, useState } from "react";

export default function Device() {
  const [temperatura, setTemperatura] = useState("-");
  const [humedad, setHumedad] = useState("-");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);


  // Obtener el nombre del dispositivo
  useEffect(() => {
    const fetchDeviceName = async () => {
      try {
        const res = await fetch('/api/getnombre'); // Llamada a /api/getnombre para obtener el nombre
        if (res.ok) {
          const data = await res.json();
          setNombre(data.name); // Establece el nombre del dispositivo en el estado
          setLoading(false); // Ya no estamos esperando
        } else {
          console.error("No se pudo obtener el nombre del dispositivo");
          setLoading(false); // Si hay un error, también dejamos de cargar
        }
      } catch (err) {
        console.error("Error al obtener el nombre del dispositivo", err);
        setLoading(false); // En caso de error, dejamos de cargar
      }
    };
    fetchDeviceName();
  }, []);


  useEffect(() => {
    if (!nombre) return; // Si no hay nombre, no hacemos la solicitud

    const fetchDeviceData = async () => {
      try {
        const res = await fetch(`/api/reportar?name=${nombre}`); // Llamada al endpoint con el nombre
        if (res.ok) {
          const data = await res.json();
          setTemperatura(data.temperature); // Establece la temperatura
          setHumedad(data.humidity); // Establece la humedad
        } else {
          console.error("Error al obtener los datos del dispositivo");
        }
      } catch (err) {
        console.error("Error al obtener datos del dispositivo", err);
      }
    };

    fetchDeviceData(); // Llamada a la API para obtener los datos

    const intervalo = setInterval(fetchDeviceData, 1000); // Actualiza cada 10s
    return () => clearInterval(intervalo); // Limpiar intervalo cuando el componente se desmonte
  }, [nombre]);

  
  const enviarComando = async (comando) => {
    localStorage.setItem("ultimo_comando", comando);
    await fetch("/api/comando", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombre, comando }),
    });
  };  

  return (
    <section className="p-4 border rounded-lg bg-white shadow-md w-full max-w-md mx-auto">
      {loading ? (
        <p>Esperando el nombre del dispositivo...</p> // Mensaje de carga
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">Dispositivo: {nombre}</h2>
          <p>🌡️ Temperatura: {temperatura} °C</p>
          <p>💧 Humedad: {humedad} %</p>

          <div className="mt-4 space-x-2">
            <button onClick={() => enviarComando("encender")}>Encender</button>
            <button onClick={() => enviarComando("apagar")}>Apagar</button>
            <button disabled>Programar</button>
            <button disabled>Comandos de voz</button>
          </div>
        </>
      )}
    </section>
  );
}
