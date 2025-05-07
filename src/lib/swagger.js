import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url'

// Para que __dirname funcione en módulos ES
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ESP32 API',
      version: '1.0.0',
    },
  },
  apis: [
    path.resolve(__dirname, '../app/api/comando/route.js'),
    path.resolve(__dirname, '../app/api/reportar/route.js'),
    path.resolve(__dirname, '../app/api/getnombre/route.js'),
    path.resolve(__dirname, '../app/api/comando-customizado/route.js')
  ]
}

export const swaggerSpec = swaggerJSDoc(options)
