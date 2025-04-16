// Ruta GET para obtener el nombre del dispositivo
export async function GET(req) {
  if (!dispositivoNombre) {
    return new Response(
      JSON.stringify({ error: "El nombre del dispositivo no está configurado" }),
      { status: 404 }
    );
  }

  return new Response(
    JSON.stringify({dispositivoNombre}),
    { status: 200 }
  );
}
