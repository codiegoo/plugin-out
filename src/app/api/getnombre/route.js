import { connection } from '@/lib/mongooseConnection'; // Para la conexión a MongoDB
import Device from '@/model/devicesModel'; // El modelo de dispositivo

// Endpoint GET para obtener el nombre del dispositivo
export async function GET(req) {
  try {
    await connection(); // Conectar a MongoDB

    // Buscar el primer dispositivo disponible
    const device = await Device.findOne().select('name'); // Obtener solo el campo 'name'

    if (!device) {
      return new Response(JSON.stringify({ error: "No hay dispositivos registrados" }), { status: 404 });
    }

    // Devolver el nombre del dispositivo
    return new Response(JSON.stringify({ name: device.name }), { status: 200 });

  } catch (error) {
    console.error('Error al obtener el nombre del dispositivo:', error);
    return new Response(JSON.stringify({ error: "Error al consultar" }), { status: 500 });
  }
}
