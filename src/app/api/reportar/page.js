


// pages/api/reportar.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nombre, temperatura, humedad } = req.body;
    console.log("Dispositivo:", nombre);
    console.log("Temp:", temperatura, "Humedad:", humedad);

    return res.status(200).json({ status: "OK", recibido: true });
  } else {
    res.status(405).end(); // Método no permitido
  }
}
