import { connection } from '@/lib/mongooseConnection'; // Para la conexión a MongoDB
import Device from '@/model/devicesModel'; // El modelo de dispositivo

// Handler para la petición POST
export async function POST(req) {
  try {
    const json = await req.json(); // Parsear el cuerpo de la solicitud como JSON
    console.log("JSON recibido:", json); // Log para depuración

    await connection(); // Establecer conexión con MongoDB

    // Extraer campos del JSON recibido
    const { name, temperature, humidity, type = 'sensor' } = json;
    const decodedName = decodeURIComponent(name); // Decodificar el nombre en caso de estar codificado en URL

    // Verificar que los campos requeridos estén presentes
    if (!decodedName || temperature == null || humidity == null) {
      return new Response(
        JSON.stringify({ error: "Faltan campos requeridos" }),
        { status: 400 } // Responder con error 400 si hay campos faltantes
      );
    }

    // Crear el objeto de actualización
    const update = {
      name: decodedName,
      type,
      last_data: {
        temperature,
        humidity,
        timestamp: new Date() // Agregar timestamp actual
      }
    };

    // Buscar el dispositivo por nombre y actualizarlo. Si no existe, se crea (upsert)
    const device = await Device.findOneAndUpdate(
      { name: decodedName },
      update,
      { upsert: true, new: true } // upsert: crea si no existe, new: retorna el documento actualizado
    );

    // Responder con éxito y el dispositivo actualizado o creado
    return new Response(JSON.stringify({ success: true, device }), { status: 200 });

  } catch (error) {
    // Capturar y mostrar cualquier error que ocurra
    console.error('Error guardando datos del dispositivo:', error);
    return new Response(
      JSON.stringify({ error: 'Error al guardar' }),
      { status: 500 } // Error interno del servidor
    );
  }
}

// Handler para la petición GET
export async function GET(req) {
  try {
    await connection(); // Conectar a MongoDB

    const { searchParams } = new URL(req.url); // Extraer parámetros de búsqueda de la URL
    const name = searchParams.get("name"); // Obtener el valor del parámetro "name"

    // Validar que se haya proporcionado un nombre
    if (!name) {
      return new Response(JSON.stringify({ error: "Falta el nombre del dispositivo" }), { status: 400 });
    }

    // Buscar el dispositivo en la base de datos por su nombre
    const device = await Device.findOne({ name });

    // Si no se encuentra el dispositivo, responder con error 404
    if (!device) {
      return new Response(JSON.stringify({ error: "Dispositivo no encontrado" }), { status: 404 });
    }

    // Si se encuentra, responder con los últimos datos del dispositivo
    return new Response(JSON.stringify(device.last_data), { status: 200 });

  } catch (error) {
    // Manejar errores y mostrar en consola
    console.error('Error al obtener datos del dispositivo:', error);
    return new Response(JSON.stringify({ error: "Error al consultar" }), { status: 500 });
  }
}
