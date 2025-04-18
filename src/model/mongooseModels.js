import mongoose from 'mongoose';

const ActionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['activate_device', 'deactivate_device']
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  duration: {
    type: Number,
    required: false
  }
}, { _id: false });

const IconSchema = new mongoose.Schema({
  name: { type: String, required: true },
  display_name: { type: String, required: true }
}, { _id: false });

const CustomCommandSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  trigger_phrase: { type: String, required: true, trim: true },
  icon: { type: IconSchema },
  actions: { type: [ActionSchema], required: true },
  manual_trigger: { type: Boolean, default: true },
  enabled: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const CustomCommand = mongoose.models.CustomCommand || mongoose.model('CustomCommand', CustomCommandSchema);
export default CustomCommand;
