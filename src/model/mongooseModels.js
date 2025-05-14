import mongoose from 'mongoose'; // Importa mongoose para definir esquemas y modelos

// Esquema para una acción dentro de un comando personalizado
const ActionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['activate_device', 'deactivate_device'] // Tipo de acción permitida
  },
  device: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a un dispositivo
    ref: 'Device', // Referencia al modelo 'Device'
    required: true
  },
  duration: {
    type: Number, // Duración opcional de la acción, en segundos
    required: false
  }
}, { _id: false }); // No se genera un _id para cada acción individual

// Esquema para un ícono asociado al comando
const IconSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre interno del ícono
  display_name: { type: String, required: true } // Nombre visible del ícono
}, { _id: false }); // No se genera un _id para cada ícono

// Esquema principal para comandos personalizados
const CustomCommandSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // ID del usuario al que pertenece el comando
  trigger_phrase: { type: String, required: true, trim: true }, // Frase que activa el comando (se limpia con trim)
  icon: { type: IconSchema }, // Ícono opcional del comando
  actions: { type: [ActionSchema], required: true }, // Lista de acciones que ejecuta el comando
  manual_trigger: { type: Boolean, default: true }, // Si el comando se puede activar manualmente
  enabled: { type: Boolean, default: true } // Si el comando está habilitado
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Nombres personalizados para los timestamps
});

// Define o reutiliza el modelo 'CustomCommand' (evita duplicaciones en desarrollo)
const CustomCommand = mongoose.models.CustomCommand || mongoose.model('CustomCommand', CustomCommandSchema);

// Exporta el modelo para uso en otras partes de la aplicación
export default CustomCommand;
