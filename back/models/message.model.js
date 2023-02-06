const mongoose = require("mongoose");

const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    channel_id: String,
    text: String,
    senderName: String,
    destName: String,
    id: String,
    sockets: [],
  })
);

module.exports = Message;