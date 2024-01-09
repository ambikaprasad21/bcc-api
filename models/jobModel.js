const mongoose = require("mongoose");
const slugify = require("slugify");

const jobSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    detail: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    slug: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

jobSchema.pre("save", function (next) {
  this.slug = slugify(this.heading, { lower: true });
  next();
});

const jobModel = mongoose.model("Job", jobSchema);

module.exports = jobModel;
