// src/lib/swagger.js
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
    path.resolve(process.cwd(), 'src/app/api/comando/route.js'),
    path.resolve(process.cwd(), 'src/app/api/reportar/route.js'),
    path.resolve(process.cwd(), 'src/app/api/getnombre/route.js'),
    path.resolve(process.cwd(), 'src/app/api/comando-customizado/route.js')
  ],
}

export const swaggerSpec = swaggerJSDoc(options)
