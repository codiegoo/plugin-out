// app/api/custom-commands/route.js

import { connection } from '@/lib/mongooseConnection'; // Conexión a MongoDB
import CustomCommand from '@/model/mongooseModels'; // Modelo de comandos personalizados

// Endpoint POST para crear un nuevo comando personalizado
export async function POST(req) {
  try {
    await connection(); // Conectar a MongoDB
    const body = await req.json(); // Leer el cuerpo de la solicitud como JSON

    // Crear un nuevo documento en la colección de comandos personalizados
    const command = await CustomCommand.create(body);

    // Responder con éxito y el comando creado
    return Response.json({ success: true, command });
  } catch (error) {
    // Manejar errores en consola y devolver un error 500
    console.error('Error creando comando:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar el comando' }), { status: 500 });
  }
}

// Endpoint GET para obtener los comandos de un usuario específico
export async function GET(req) {
  try {
    await connection(); // Conectar a MongoDB

    const { searchParams } = new URL(req.url); // Extraer parámetros de la URL
    const userId = searchParams.get('user_id'); // Obtener el user_id de la query

    // Validar que se haya proporcionado user_id
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Falta user_id en la query' }), { status: 400 });
    }

    // Buscar todos los comandos del usuario, ordenados por fecha de creación descendente
    const commands = await CustomCommand.find({ user_id: userId }).sort({ created_at: -1 });

    // Responder con éxito y la lista de comandos
    return Response.json({ success: true, commands });
  } catch (error) {
    // Manejar errores en consola y devolver un error 500
    console.error('Error obteniendo comandos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener los comandos' }), { status: 500 });
  }
}
