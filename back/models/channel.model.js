const mongoose = require("mongoose");

const Channel = mongoose.model(
  "Channel",
  new mongoose.Schema({
    name: String,
    participants: [Number],
    sockets: [],
  })
);

module.exports = Channel;
