// Guardamos el último comando enviado a un dispositivo
let ultimoComando = {};

export async function POST(req) {
  const body = await req.json();
  const { nombre, comando } = body;

  if (!nombre || !comando) {
    return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
  }

  ultimoComando[nombre] = comando;
  return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const nombre = searchParams.get("nombre");

  if (!nombre) {
    return new Response(JSON.stringify({ error: "Falta el nombre" }), { status: 400 });
  }

  const comando = ultimoComando[nombre] || null;

  return new Response(JSON.stringify({ comando }), { status: 200 });
}
