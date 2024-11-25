const mongoose = require('mongoose');

// Define the schema for the message model
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,  // Make sure every message has text
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User model
      required: true,  // The user who sent the message is required
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',  // Reference to the Group model
      required: true,  // The group the message belongs to is required
    },
    createdAt: {
      type: Date,
      default: Date.now,  // Automatically set the current date and time when the message is created
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);
