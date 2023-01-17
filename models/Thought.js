const { Schema, model } = require("mongoose");
const reactionsSchema = require("./Reaction");
const moment = require("moment");

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// total number of reactions
thoughtsSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});
// creates Thoughts model using Thoughts Schema
const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
