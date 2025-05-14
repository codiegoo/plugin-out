import mongoose from 'mongoose'; // Importar el cliente de Mongoose para conectarse a MongoDB

// Obtener la URI de conexión desde las variables de entorno
const MONGODB_URI = process.env.MONGODB_URI;

// Verificar que la variable de entorno esté definida
if (!MONGODB_URI) {
  // Lanzar un error si no se encuentra la URI, lo cual es obligatorio
  throw new Error('⚠️  Debes definir MONGODB_URI en .env.local');
}

// Usar una caché global para evitar múltiples conexiones en desarrollo (especialmente con Next.js)
let cached = global.mongoose || { conn: null, promise: null };

// Función asíncrona para establecer la conexión con MongoDB
export async function connection() {
  // Si ya hay una conexión activa, retornarla directamente
  if (cached.conn) return cached.conn;

  // Si no hay una promesa en curso, crear una nueva
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,      // Usar el nuevo parser de URL de MongoDB
      useUnifiedTopology: true   // Usar el nuevo motor de topología unificada
    }).then((mongoose) => {
      return mongoose; // Retornar la instancia de Mongoose una vez conectado
    });
  }

  // Esperar a que la promesa se resuelva y guardar la conexión
  cached.conn = await cached.promise;

  // Guardar en el objeto global para reutilizar en el futuro
  global.mongoose = cached;

  // Retornar la conexión activa
  return cached.conn;
}
