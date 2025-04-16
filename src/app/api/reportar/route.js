let ultimoEstado = {}; // ahora es un objeto por dispositivo
let dispositivoNombre = null; // almacenar nombre del dispositivo

export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, temperatura, humedad } = body;

    if (!nombre) {
      return new Response(
        JSON.stringify({ error: "Falta el nombre del dispositivo" }),
        { status: 400 }
      );
    }

    // Guardar el nombre y los datos del dispositivo
    dispositivoNombre = nombre;
    ultimoEstado[nombre] = { temperatura, humedad };

    return new Response(
      JSON.stringify({ status: "OK", recibido: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const nombre = searchParams.get("nombre");

    if (!nombre) {
      return new Response(
        JSON.stringify({ error: "Falta el nombre del dispositivo" }),
        { status: 400 }
      );
    }

    const estado = ultimoEstado[nombre];

    if (!estado) {
      return new Response(
        JSON.stringify({ error: "Dispositivo no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(estado), { status: 200 });
  } catch (error) {
    console.error('Error al obtener el estado del dispositivo:', error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
