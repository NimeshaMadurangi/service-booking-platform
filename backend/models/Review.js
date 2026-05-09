const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
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
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"],
    },
    bookingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking is required"],
      unique: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      default: "",
      maxlength: [500, "Comment cannot exceed 500 characters"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

reviewSchema.index({ providerID: 1 })
reviewSchema.index({ serviceID: 1 })

reviewSchema.post("save", async function () {
  try {
    const ProviderDetails = mongoose.model("ProviderDetails")

    const reviews = await mongoose.model("Review").find({
      providerID: this.providerID,
    })

    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    await ProviderDetails.findOneAndUpdate(
      { providerID: this.providerID },
      { averageRating: parseFloat(avg.toFixed(1)) },
    )
  } catch (err) {
    console.error("Rating update error:", err.message)
  }
})

module.exports = mongoose.model("Review", reviewSchema)
