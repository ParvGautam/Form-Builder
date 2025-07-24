const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: { type: String },
  answers: { type: Object, required: true },
  submittedAt: { type: Date, required: true },
}, { timestamps: true });

const Response = mongoose.model('Response', responseSchema);

module.exports = Response; 