import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // ej: "sistema_riego1"
  type: { type: String, required: true }, // ej: "riego", "ventilador", "sensor"
  last_data: {
    temperature: Number,
    humidity: Number,
    timestamp: Date
  }
}, {
  timestamps: true // agrega createdAt y updatedAt automáticamente
});

const Device = mongoose.models.Device || mongoose.model('Device', DeviceSchema);
export default Device;
