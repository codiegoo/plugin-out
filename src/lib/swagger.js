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
  apis: ['./src/app/api/**/*.js'],
}

export const swaggerSpec = swaggerJSDoc(options)
