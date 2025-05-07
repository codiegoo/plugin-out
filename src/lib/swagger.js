import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
// Forzar la inclusión de las rutas en el build de Vercel
import '@/app/api/comando/route.js'
import '@/app/api/reportar/route.js'
import '@/app/api/getnombre/route.js'
import '@/app/api/comando-customizado/route.js'


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ESP32 API',
      version: '1.0.0',
    },
  },
  apis: [
    path.join(process.cwd(), 'src/app/api/comando/route.js'),
    path.join(process.cwd(), 'src/app/api/reportar/route.js'),
    path.join(process.cwd(), 'src/app/api/getnombre/route.js'),
    path.join(process.cwd(), 'src/app/api/comando-customizado/route.js')
  ]
}

export const swaggerSpec = swaggerJSDoc(options)
