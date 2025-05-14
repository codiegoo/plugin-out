let ultimoComando = {}; // Objeto para almacenar el último comando enviado por cada dispositivo, usando su nombre como clave

// Endpoint POST para registrar el último comando recibido para un dispositivo
export async function POST(req) {
  const { nombre, comando } = await req.json(); // Obtener los datos del cuerpo de la solicitud

  // Validar que se hayan recibido ambos campos
  if (!nombre || !comando) {
    return new Response(
      JSON.stringify({ error: "Faltan datos" }), // Mensaje de error si falta algún campo
      { status: 400 } // Código de estado 400: Bad Request
    );
  }

  // Guardar el comando como el último recibido para ese dispositivo
  ultimoComando[nombre] = comando;

  // Responder con estado OK
  return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
}

// Endpoint GET para obtener el último comando enviado a un dispositivo
export async function GET(req) {
  const { searchParams } = new URL(req.url); // Extraer parámetros de la URL
  const nombre = searchParams.get("nombre"); // Obtener el nombre del dispositivo

  // Validar que se haya proporcionado el nombre
  if (!nombre) {
    const err = "Falta el nombre";
    return new Response(err, {
      status: 400, // Código de estado 400: Bad Request
      headers: {
        "Content-Type": "text/plain", // La respuesta es texto plano
        "Content-Length": Buffer.byteLength(err).toString(), // Longitud del contenido en bytes
        "Cache-Control": "no-store", // Evitar cachear la respuesta
        "Content-Encoding": "identity" // Sin compresión
      }
    });
  }

  // Obtener el último comando asociado al nombre, o cadena vacía si no existe
  const comando = (ultimoComando[nombre] || "").trim();

  // Mostrar en consola el comando recuperado para ese dispositivo
  console.log(`Comando para ${nombre}: ${comando}`);

  // Responder con el comando en texto plano
  return new Response(comando, {
    status: 200, // Código de estado 200: OK
    headers: {
      "Content-Type": "text/plain", // Tipo de contenido texto plano
      "Content-Length": Buffer.byteLength(comando).toString(), // Longitud del contenido
      "Cache-Control": "no-store", // No almacenar en caché
      "Content-Encoding": "identity" // Sin codificación
    }
  });
}
