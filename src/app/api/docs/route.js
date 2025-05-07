// app/api/docs/route.js
import { swaggerSpec } from '@/lib/swagger'

export async function GET() {
  // Verificar que swaggerSpec contiene las rutas correctamente
  console.log(swaggerSpec);
  return new Response(JSON.stringify(swaggerSpec), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}