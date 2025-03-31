"use client";
import { useEffect, useState } from "react";

export default function Device() {
  const [temperatura, setTemperatura] = useState("-");
  const [humedad, setHumedad] = useState("-");
  const [nombre] = useState("sensorSala"); // o pásalo como prop

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const res = await fetch(`/api/estado?nombre=${nombre}`);
        if (res.ok) {
          const data = await res.json();
          setTemperatura(data.temperatura);
          setHumedad(data.humedad);
        }
      } catch (err) {
        console.error("Error al obtener datos del dispositivo", err);
      }
    };

    fetchDatos();
    const intervalo = setInterval(fetchDatos, 10000); // actualiza cada 10s
    return () => clearInterval(intervalo);
  }, [nombre]);

  const enviarComando = async (comando) => {
    const socket = io("https://tu-api.com", { path: "/api/socket" });
    socket.emit("comando", { nombre, comando });
  };

  return (
    <section className="p-4 border rounded-lg bg-white shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Dispositivo: {nombre}</h2>
      <p>🌡️ Temperatura: {temperatura} °C</p>
      <p>💧 Humedad: {humedad} %</p>

      <div className="mt-4 space-x-2">
        <button onClick={() => enviarComando("encender")}>Encender</button>
        <button onClick={() => enviarComando("apagar")}>Apagar</button>
        <button disabled>Programar</button>
        <button disabled>Comandos de voz</button>
      </div>
    </section>
  );
}
