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
