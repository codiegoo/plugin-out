import { connection } from '@/lib/mongooseConnection'; // Para la conexión a MongoDB
import Device from '@/model/devicesModel'; // El modelo de dispositivo

// Endpoint GET para obtener el nombre del primer dispositivo registrado
export async function GET(req) {
  try {
    await connection(); // Establecer conexión con MongoDB

    // Buscar el primer dispositivo registrado en la colección y seleccionar solo el campo 'name'
    const device = await Device.findOne().select('name');

    // Si no se encuentra ningún dispositivo, responder con error 404
    if (!device) {
      return new Response(JSON.stringify({ error: "No hay dispositivos registrados" }), { status: 404 });
    }

    // Si se encuentra un dispositivo, devolver su nombre
    return new Response(JSON.stringify({ name: device.name }), { status: 200 });

  } catch (error) {
    // Capturar y mostrar errores en consola
    console.error('Error al obtener el nombre del dispositivo:', error);
    return new Response(JSON.stringify({ error: "Error al consultar" }), { status: 500 }); // Error interno del servidor
  }
}
