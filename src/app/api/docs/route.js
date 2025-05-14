// app/api/docs/route.js
import { swaggerSpec } from '@/lib/swagger' // Importar el objeto de especificación Swagger (OpenAPI) generado

// Handler para la petición GET
export async function GET() {
  // Imprimir en consola la especificación Swagger para verificar que se está generando correctamente
  console.log(swaggerSpec);

  // Devolver la especificación Swagger como respuesta en formato JSON
  return new Response(JSON.stringify(swaggerSpec), {
    status: 200, // Código de estado HTTP 200: OK
    headers: {
      'Content-Type': 'application/json', // Indicar que el contenido es JSON
    },
  })
}
