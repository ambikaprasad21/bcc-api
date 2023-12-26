const mongoose = require("mongoose");

const schoolarshipSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNo: {
      type: Number,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: {
        values: ["fresh", "renewal"],
      },
      required: true,
    },
    date: {
      type: Date,
    },
    paid: {
      type: Boolean,
      required: true,
    },
    charge: {
      type: Number,
      required: true,
    },
    class: {
      type: String,
      required: true,
      enum: {
        values: [
          "prematric",
          "intermediate",
          "postmatric other than inter",
          "postmatric other state",
        ],
      },
    },
    DOB: {
      type: Date,
      reqired: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schoolarshipSchema.pre("save", function (next) {
  const parsedDate = new Date(this.date);
  const parsedDOB = new Date(this.DOB);
  this.DOB = parsedDOB;
  this.date = parsedDate;
  next();
});

const Schoolarship = mongoose.model("Schoolarship", schoolarshipSchema);

module.exports = Schoolarship;
