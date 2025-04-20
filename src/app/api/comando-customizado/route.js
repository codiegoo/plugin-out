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



export async function GET(req) {
  try {
    await connection();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Falta user_id en la query' }), { status: 400 });
    }

    const commands = await CustomCommand.find({ user_id: userId }).sort({ created_at: -1 });

    return Response.json({ success: true, commands });
  } catch (error) {
    console.error('Error obteniendo comandos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener los comandos' }), { status: 500 });
  }
}