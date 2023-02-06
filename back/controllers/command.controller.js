const MongoCo = require("./mongo.controller");
const Channel = require("../models/channel.model");
const User = require("../models/user.model");

exports.changeNickname = (message, nickname) => {
  MongoCo.changeName(message.senderName, nickname);
  console.log("your nickname is");
  message.senderName = "Console";
  message.text = "Your nickname is now :  " + nickname;

  return message;
};

exports.listOfChannel = async (message) => {
  console.log("list");
  channel = await MongoCo.getAllChannel();
  message.senderName = "Console";
  message.text = "List of all channel : ";

  channel.forEach((element) => {
    message.text += element.name + " ";
  });
  return message;
};

exports.createChannel = (message, name) => {
  console.log("creating");
  const newChannel = new Channel({
    name: name,
    participants: [],
  });
  newChannel.save((err, res) => {
    if (err) return handleError(err);
    else return console.log("Result: ", res);
  });
  if (message != null) {
    message.senderName = "Console";
    message.text = "Chanel " + name + " create";
    return message;
  }
};

exports.deleteChannel = (message, name) => {
  console.log("delete");
  Channel.deleteOne({ name: name })
    .then(function () {
      console.log("Channel deleted");
    })
    .catch(function (error) {
      console.log(error);
    });
  if (message != null) {
    message.senderName = "Console";
    message.text = "Chanel " + name + " delete";
    return message;
  }
};

exports.privateMsg = (message, name) => {
  message.destName = name;
  message.text = message.text.replace("/msg", "").trim();
  message.text = message.text.replace(name, "").trim();
  message.text = "Private : " + message.text;
  MongoCo.saveMessage(
    message.channel_id,
    message.text,
    message.senderName,
    message.destName,
    message.id
  );
  return message;
};

exports.joinChannel = (message, username, channelName) => {
  User.findOneAndUpdate(
    { username: username },
    { $push: { channels: channelName } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
  message.senderName = "Console";
  message.text = "You join : " + channelName;
  return message;
};

exports.quitChannel = (message, username, channelName) => {
  User.findOneAndUpdate(
    { username: username },
    { $pull: { channels: channelName } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
  message.senderName = "Console";
  message.text = "You quit : " + channelName;
  return message;
};

exports.getUserChannel = async (message, channelName) => {
  users = await User.find({ channels: { $in: channelName } }).exec();
  message.senderName = "Console";
  message.text = "List of users in the channel " + channelName + " : ";

  users.forEach((element) => {
    message.text += element.username + " ";
  });
  return message;
};
