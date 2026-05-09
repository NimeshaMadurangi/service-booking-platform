const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"],
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    providerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Provider is required"],
    },
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    bookingDate: {
      type: Date,
      required: [true, "Booking date is required"],
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
    },
    location: {
      type: String,
      default: "",
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "completed", "cancelled"],
        message: "Invalid status",
      },
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    totalAmount: {
      type: Number,
      default: 0,
      min: [0, "Amount cannot be negative"],
    },
    cancelledBy: {
      type: String,
      enum: ["user", "provider", null],
      default: null,
    },
    cancelReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

bookingSchema.index({ userID: 1, status: 1 })
bookingSchema.index({ providerID: 1, status: 1 })

module.exports = mongoose.model("Booking", bookingSchema)
