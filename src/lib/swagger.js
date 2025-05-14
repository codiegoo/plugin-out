import swaggerJSDoc from 'swagger-jsdoc' // Importa swagger-jsdoc para generar la especificación Swagger a partir de comentarios en el código
import path from 'path' // Importa el módulo 'path' de Node.js para trabajar con rutas de archivos

// Configuración de opciones para swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0', // Versión del estándar OpenAPI que se utilizará
    info: {
      title: 'ESP32 API',     // Título de la documentación de la API
      version: '1.0.0',       // Versión de la API
    },
  },
  apis: [
    // Ruta al archivo donde están documentados los endpoints mediante comentarios JSDoc
    path.join(process.cwd(), 'src/lib/endpoints.js'),
  ]
}

// Genera el objeto swaggerSpec con la configuración proporcionada
export const swaggerSpec = swaggerJSDoc(options)
