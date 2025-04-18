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
    return new Response(
      JSON.stringify({ error: "Falta el nombre" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify({ error: "Falta el nombre" }).length.toString(),
          "Cache-Control": "no-store",
          "Content-Encoding": "identity",
        },
      }
    );
  }

  const comando = ultimoComando[nombre] || "";
  const json = JSON.stringify({ comando });

  return new Response(json, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": json.length.toString(), // 👈 Este es el que faltaba
      "Cache-Control": "no-store",
      "Content-Encoding": "identity",
    },
  });
}
