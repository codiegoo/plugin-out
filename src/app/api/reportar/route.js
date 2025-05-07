import { connection } from '@/lib/mongooseConnection'; // Para la conexión a MongoDB
import Device from '@/model/devicesModel'; // El modelo de dispositivo

/**
 * @swagger
 * /api/reportar:
 *   post:
 *     summary: Reporta datos desde ESP32
 *     tags: [Reportar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             title: Datos de reporte
 *             properties:
 *               name:
 *                 type: string
 *                 example: sensor001
 *               temperature:
 *                 type: number
 *                 example: 23.5
 *               humidity:
 *                 type: number
 *                 example: 60.2
 *     responses:
 *       200:
 *         description: Datos guardados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 device:
 *                   type: object
 */

/**
 * @swagger
 * /api/reportar:
 *   get:
 *     summary: Obtiene el último estado del dispositivo
 *     tags: [Reportar]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del dispositivo
 *     responses:
 *       200:
 *         description: Último estado reportado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: Último dato reportado
 *               properties:
 *                 temperature:
 *                   type: number
 *                   example: 22.7
 *                 humidity:
 *                   type: number
 *                   example: 59.4
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Dispositivo no encontrado
 */

export async function POST(req) {
  try {
    const json = await req.json();
    console.log("JSON recibido:", json);

    await connection();

    const { name, temperature, humidity, type = 'sensor' } = json;
    const decodedName = decodeURIComponent(name);

    if (!decodedName || temperature == null || humidity == null) {
      return new Response(
        JSON.stringify({ error: "Faltan campos requeridos" }),
        { status: 400 }
      );
    }

    const update = {
      name: decodedName,
      type,
      last_data: {
        temperature,
        humidity,
        timestamp: new Date()
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
    return new Response(
      JSON.stringify({ error: 'Error al guardar' }),
      { status: 500 }
    );
  }
}


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
