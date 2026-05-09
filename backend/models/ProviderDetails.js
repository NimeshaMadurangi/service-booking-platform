const mongoose = require("mongoose")

const SKILLS_LIST = [
  "Plumbing",
  "Electrical Work",
  "Building Construction",
  "Masonry & Bricklaying",
  "Roof Repair",
  "Welding & Fabrication",
  "Carpentry & Woodwork",
  "Painting & Decorating",
  "Tiling & Flooring",
  "Aluminium & Glass Work",
  "AC Installation & Repair",
  "CCTV & Security Systems",

  "Gardening & Landscaping",
  "Coconut Tree Climbing",
  "Tree Cutting & Trimming",
  "Pest Control",
  "Well Digging & Cleaning",

  "House Cleaning",
  "Sofa & Mattress Cleaning",
  "Vehicle Washing",
  "Laundry Service",
  "Cooking & Catering",
  "Babysitting & Childcare",
  "Elder Care",

  "Moving & Relocation",
  "Lorry & Van Service",
  "Motorcycle Delivery",

  "Computer Repair",
  "Phone Repair",
  "CCTV Installation",
  "Solar Panel Installation",
  "Tuition & Teaching",
  "Photography & Videography",

  "Paddy Farming",
  "Vegetable Farming",
  "Animal Husbandry",

  "Other",
]

const providerDetailsSchema = new mongoose.Schema(
  {
    providerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Provider ID is required"],
      unique: true,
    },
    bio: {
      type: String,
      default: "",
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    skills: {
      type: [String],
      default: [],
      validate: {
        validator: function (selectedSkills) {
          return selectedSkills.every(skill => SKILLS_LIST.includes(skill))
        },
        message: "One or more selected skills are invalid",
      },
    },
    experience: {
      type: String,
      default: "",
      maxlength: [300, "Experience cannot exceed 300 characters"],
    },
    availability: {
      type: String,
      default: "",
    },
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    totalEarnings: {
      type: Number,
      default: 0,
      min: [0, "Earnings cannot be negative"],
    },
    completedJobs: {
      type: Number,
      default: 0,
      min: [0, "Completed jobs cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
)

const ProviderDetails = mongoose.model("ProviderDetails", providerDetailsSchema)

module.exports = ProviderDetails
module.exports.SKILLS_LIST = SKILLS_LIST
