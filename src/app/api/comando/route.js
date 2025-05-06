/**
 * @swagger
 * /api/comando:
 *   post:
 *     summary: Registra el último comando enviado a un dispositivo
 *     tags: [Comando]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "sensor01"
 *               comando:
 *                 type: string
 *                 example: "ON"
 *     responses:
 *       200:
 *         description: Comando guardado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: Faltan datos requeridos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Faltan datos
 */

/**
 * @swagger
 * /api/comando:
 *   get:
 *     summary: Obtiene el último comando para un dispositivo específico
 *     tags: [Comando]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del dispositivo
 *     responses:
 *       200:
 *         description: Último comando en texto plano
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: ON
 *       400:
 *         description: Falta el nombre del dispositivo
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Falta el nombre
 */


let ultimoComando = {}; // comandos por dispositivo

export async function POST(req) {
  const { nombre, comando } = await req.json();

  if (!nombre || !comando) {
    return new Response(
      JSON.stringify({ error: "Faltan datos" }),
      { status: 400 }
    );
  }

  ultimoComando[nombre] = comando;

  return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
}




export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const nombre = searchParams.get("nombre");

  if (!nombre) {
    const err = "Falta el nombre";
    return new Response(err, {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": Buffer.byteLength(err).toString(),
        "Cache-Control": "no-store",
        "Content-Encoding": "identity"
      }
    });
  }

  const comando = (ultimoComando[nombre] || "").trim();

  // Verifica que el comando que se va a devolver no esté vacío
  console.log(`Comando para ${nombre}: ${comando}`);

  return new Response(comando, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Content-Length": Buffer.byteLength(comando).toString(),
      "Cache-Control": "no-store",
      "Content-Encoding": "identity"
    }
  });
}
