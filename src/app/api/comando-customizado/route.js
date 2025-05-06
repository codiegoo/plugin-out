// app/api/custom-commands/route.js

import { connection } from '@/lib/mongooseConnection';
import CustomCommand from '@/model/mongooseModels';


/**
 * @swagger
 * /api/comando-customizado:
 *   post:
 *     summary: Crea un nuevo comando personalizado
 *     tags: [Comando-customizado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "654321"
 *               name:
 *                 type: string
 *                 example: "Encender luz"
 *               action:
 *                 type: string
 *                 example: "ON"
 *     responses:
 *       200:
 *         description: Comando creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 command:
 *                   type: object
 *       500:
 *         description: Error al guardar el comando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al guardar el comando
 */

/**
 * @swagger
 * /api/custom-commands:
 *   get:
 *     summary: Obtiene los comandos personalizados de un usuario
 *     tags: [Comando]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de comandos personalizados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 commands:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Falta user_id en la query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Falta user_id en la query
 *       500:
 *         description: Error al obtener los comandos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los comandos
 */


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