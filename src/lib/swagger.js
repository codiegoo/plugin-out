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
    path.join(process.cwd(), 'src/lib/endpoints.js'),
  ]
}

export const swaggerSpec = swaggerJSDoc(options)
