import { connection } from '@/lib/mongooseConnection'; // Para la conexión a MongoDB
import Device from '@/model/devicesModel'; // El modelo de dispositivo

// Endpoint POST para recibir datos desde el ESP32
export async function POST(req) {

  const json = await req.json();
  console.log("JSON recibido:", json);


  try {
    await connection(); // Conectar a MongoDB

    const { name, temperature, humidity, type = 'sensor' } = await req.json();
    const decodedName = decodeURIComponent(name);


    if (!name || temperature == null || humidity == null) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), { status: 400 });
    }

    // Crear o actualizar el dispositivo
    const update = {
      type,
      last_data: {
        temperature,
        humidity,
        timestamp: new Date() // Hora exacta de la actualización
      }
    };

    const device = await Device.findOneAndUpdate(
      { name: decodedName },
      update,
      { upsert: true, new: true }
    );
    

    return new Response(JSON.stringify({ success: true, device }), { status: 200 });

  } catch (error) {
    console.error('Error guardando datos del dispositivo:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar' }), { status: 500 });
  }
}

// Endpoint GET para obtener el estado actual del dispositivo
export async function GET(req) {
  try {
    await connection(); // Conectar a MongoDB

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return new Response(JSON.stringify({ error: "Falta el nombre del dispositivo" }), { status: 400 });
    }

    // Buscar el dispositivo por su nombre
    const device = await Device.findOne({ name });

    if (!device) {
      return new Response(JSON.stringify({ error: "Dispositivo no encontrado" }), { status: 404 });
    }

    // Devolver el estado actual del dispositivo
    return new Response(JSON.stringify(device.last_data), { status: 200 });

  } catch (error) {
    console.error('Error al obtener datos del dispositivo:', error);
    return new Response(JSON.stringify({ error: "Error al consultar" }), { status: 500 });
  }
}
