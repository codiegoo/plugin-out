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
// En tu handler GET en la API (Next.js o similar)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const nombre = searchParams.get("nombre");

  if (!nombre) {
    const err = "Falta el nombre";
    return new Response(err, {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": err.length.toString(),
        "Cache-Control": "no-store",
        "Content-Encoding": "identity"
      }
    });
  }

  const comando = ultimoComando[nombre] || "";
  return new Response(comando, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Content-Length": comando.length.toString(),
      "Cache-Control": "no-store",
      "Content-Encoding": "identity"
    }
  });
}
