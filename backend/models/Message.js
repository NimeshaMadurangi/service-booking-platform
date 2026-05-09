const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"],
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver is required"],
    },
    bookingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    message: {
      type: String,
      required: [true, "Message cannot be empty"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "booking_request", "booking_update"],
      default: "text",
    },
  },
  {
    timestamps: true,
  },
)

messageSchema.index({ senderID: 1, receiverID: 1 })
messageSchema.index({ receiverID: 1, isRead: 1 })

module.exports = mongoose.model("Message", messageSchema)
