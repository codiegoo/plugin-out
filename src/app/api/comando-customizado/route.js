// app/api/custom-commands/route.js

import { connection } from '@/lib/mongooseConnection';
import CustomCommand from '@/model/mongooseModels';

export async function POST(req) {
  try {
    await connection();
    const body = await req.json();

    const command = await CustomCommand.create(body);
    return Response.json({ success: true, command });
  } catch (error) {
    console.error('Error creando comando:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar el comando' }), { status: 500 });
  }
}
