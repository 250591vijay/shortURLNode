const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    //Output
    // visitHistory: [
    //     {
    //       timestamp: 1735290928123,
    //       _id: ObjectId('676e7030157376dd2997c31a')
    //     }
    //   ],
  },
  { timestamps: true }
);
const URL = mongoose.model("url", urlSchema);

module.exports = URL;
