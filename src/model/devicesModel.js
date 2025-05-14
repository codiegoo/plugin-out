import mongoose from 'mongoose'; // Importa mongoose para definir el esquema y el modelo

// Definición del esquema para el dispositivo
const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Nombre del dispositivo, debe ser único. Ej: "sistema_riego1"
  type: { type: String, required: true }, // Tipo de dispositivo. Ej: "riego", "ventilador", "sensor"
  last_data: {
    temperature: Number, // Última temperatura registrada
    humidity: Number,    // Última humedad registrada
    timestamp: Date      // Fecha y hora de la última actualización
  }
}, {
  timestamps: true // Agrega automáticamente los campos createdAt y updatedAt al documento
});

// Crea el modelo 'Device' si no existe, o reutiliza el ya creado (evita error en hot reload)
const Device = mongoose.models.Device || mongoose.model('Device', DeviceSchema);

// Exporta el modelo para su uso en otras partes del proyecto
export default Device;
