const mongoose = require("mongoose");

//===================================
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    author: {
      type: String,
      default: 'Admin',
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    coverImageUrl: {
      type: String,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    createdBy: {
      type: String,
      default: 'sys tem',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const blogModel = mongoose.model('Blog', blogSchema);
module.exports = blogModel;
