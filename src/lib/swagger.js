import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'

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
