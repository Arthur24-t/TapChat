const Message = require("../models/message.model");
const User = require("../models/user.model");
const Channel = require("../models/channel.model");

exports.saveMessage = async (channel_id, text, senderName, destName, id) => {
  const message = new Message({
    channel_id: channel_id,
    text: text,
    senderName: senderName,
    destName: destName,
    id: id,
  });

  message.save((err, res) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.changeName = (username, nickname) => {
  console.log(username, nickname);
  const filter = { username: username };
  const update = { nickname: nickname };
  User.findOneAndUpdate(
    filter,
    { $set: update },
    { new: true, passRawResult: true },
    (err, doc, raw) => {
      console.log(err, doc, raw);
    }
  );
};

exports.changeNameChannel = (id, name) => {
  const filter = { _id: id };
  const update = { name: name };
  Channel.findOneAndUpdate(
    filter,
    { $set: update },
    { new: true, passRawResult: true },
    (err, doc, raw) => {
      console.log(err, doc, raw);
    }
  );
};

exports.getUserChannel = async (name) => {
  const filter = { username: name };
  var array = []
  array = await User.findOne(filter).exec();
  channels = await Channel.find({ name: { $in: array.channels } }).exec();
 
 
 return channels
};

exports.getMessage = async () => {
  message = await Message.find({}).exec();
  return message
};

exports.getAllChannel = async () => {
  channels = await Channel.find({}).exec();
  return channels
};
