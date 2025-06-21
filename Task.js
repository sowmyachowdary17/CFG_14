const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    dueDate: Date,
    assignedTo: String,
    notified: { type: Boolean, default: false },
    file: String
});

module.exports = mongoose.model('Task', taskSchema);
