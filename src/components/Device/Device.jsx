"use client";
import Humedity from '../Humedity/Humedity';
import Temperature from '../Temperature/Temperature';
import './device.sass'
import { useEffect, useState } from "react";

export default function Device() {
  const [temperatura, setTemperatura] = useState("-");
  const [humedad, setHumedad] = useState("-");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const [activo, setActivo] = useState(false);



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


  const handleToggleChange = async (e) => {
    const nuevoEstado = e.target.checked;
    setActivo(nuevoEstado);
    await enviarComando(nuevoEstado ? "encender" : "apagar");
  };

  
  
  const enviarComando = async (comando) => {
    localStorage.setItem("ultimo_comando", comando);
    await fetch("/api/comando", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombre, comando }),
    });
  };  

  return (
    <section className="deviceContain p-4 border rounded-lg bg-white shadow-md w-full max-w-md mx-auto">
      {loading ? (
        <p >Esperando el nombre del dispositivo...</p> // Mensaje de carga
      ) : (
        <>

          <div className="textContain">
            <h2 className="nameDevice text-xl font-bold mb-2">Dispositivo: {nombre}</h2>
            <div className="toggle-container">
              <div className="toggle-wrap">
                <input className=" toggle-input" id="holo-toggle" type="checkbox" checked={activo} onChange={handleToggleChange}/>
                <label className=" labelToggle toggle-track" for="holo-toggle">
                  <div className="track-lines">
                    <div className="track-line"></div>
                  </div>

                  <div className="toggle-thumb">
                    <div className="thumb-core"></div>
                    <div className="thumb-inner"></div>
                    <div className="thumb-scan"></div>
                    <div className="thumb-particles">
                      <div className="thumb-particle"></div>
                      <div className="thumb-particle"></div>
                      <div className="thumb-particle"></div>
                      <div className="thumb-particle"></div>
                      <div className="thumb-particle"></div>
                    </div>
                  </div>

                  <div className="toggle-data">
                    <div className="data-text off">OFF</div>
                    <div className="data-text on">ON</div>
                    <div className="status-indicator off"></div>
                    <div className="status-indicator on"></div>
                  </div>

                  <div className="energy-rings">
                    <div className="energy-ring"></div>
                    <div className="energy-ring"></div>
                    <div className="energy-ring"></div>
                  </div>

                  <div className="interface-lines">
                    <div className="interface-line"></div>
                    <div className="interface-line"></div>
                    <div className="interface-line"></div>
                    <div className="interface-line"></div>
                    <div className="interface-line"></div>
                    <div className="interface-line"></div>
                  </div>

                  <div className="toggle-reflection"></div>
                  <div className="holo-glow"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="dataContain">
            <Temperature temperatura={temperatura}/>
            <Humedity humedad={humedad}/>
          </div>
        </>
      )}

      <a href="/docs" className="mt-4 inline-block text-blue-500 underline">
        Ver documentación Swagger
      </a>
    </section>
  );
}
