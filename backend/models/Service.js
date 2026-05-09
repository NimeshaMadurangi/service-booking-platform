const mongoose = require("mongoose")

const CATEGORIES_LIST = [
  "Construction & Repair",
  "Electrical Work",
  "Plumbing",
  "Painting & Decorating",
  "Gardening & Landscaping",
  "Home Cleaning",
  "Vehicle Services",
  "Transport & Moving",
  "Computer & Phone Repair",
  "Cooking & Catering",
  "Childcare & Elder Care",
  "Agriculture",
  "Photography & Videography",
  "Tuition & Teaching",
  "Solar & Security Systems",
  "Other",
]

const serviceSchema = new mongoose.Schema(
  {
    providerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Provider is required"],
    },
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: CATEGORIES_LIST,
        message: "Invalid category selected",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    priceType: {
      type: String,
      enum: ["fixed", "hourly", "daily", "negotiable"],
      default: "fixed",
    },
    province: { type: String, default: "" },
    district: { type: String, default: "" },
    town: { type: String, default: "" },
    serviceImg: { type: String, default: "" },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

serviceSchema.index({ category: 1, province: 1, district: 1 })
serviceSchema.index({ title: "text", description: "text" })

const Service = mongoose.model("Service", serviceSchema)

module.exports = Service
module.exports.CATEGORIES_LIST = CATEGORIES_LIST
