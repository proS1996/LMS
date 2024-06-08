const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  // Add fields for alert content and severity
});

module.exports = mongoose.model('Alert', alertSchema);
