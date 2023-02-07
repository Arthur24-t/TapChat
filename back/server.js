var app = require("express")();
var http = require("http").createServer(app);

const MongoCo = require("./controllers/mongo.controller");
const Command = require("./controllers/command.controller");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
var CHANNELS = [];
const db = require("./models");
const Role = db.role;

const PORT = process.env.PORT;
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

db.mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWD}@irc.uidoj5k.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

async function refresh(username) {
  CHANNELS = await MongoCo.getUserChannel(username);
  messages = await MongoCo.getMessage();
  io.emit("getChannel-"+ username, CHANNELS);
  io.emit("getMessage-"+ username, messages);
}

io.on("connection", (socket) => {
  console.log("new client connected");
  socket.emit("connection", null);
  socket.on("sendInfo", async (name) => {
    refresh(name);
  });

  socket.on("create", async (data) => {
    console.log("creating");
    Command.createChannel(null, data.name);
    refresh(data.username);
  });

  socket.on("remove", async (data) => {
    console.log("delete");
    Command.deleteChannel(null, data.name);
    console.log(data.username);
    refresh(data.username);
  });
  socket.on("renameChannel", async (data) => {
    MongoCo.changeNameChannel(data.id, data.name);
    refresh(data.username);
  });

  socket.on("chgPseudo", (name, pseudo) => {
    MongoCo.changeName(name, pseudo);
    io.emit("nickname", pseudo);
  });

  socket.on("send-message", async (message) => {
    if (message.text[0] === "/") {
      const cmd = message.text.split(" ");
      switch (cmd[0]) {
        case "/nick":
          message = Command.changeNickname(message, cmd[1]);
          io.emit("nickname", cmd[1]);
          io.emit("message", message);
          break;
        case "/list":
          message = await Command.listOfChannel(message);
          io.emit("message", message);
          break;
        case "/create":
          message = Command.createChannel(message, cmd[1]);
          io.emit("message", message);
          break;
        case "/delete":
          message = Command.deleteChannel(message, cmd[1]);
          io.emit("message", message);
          break;
        case "/join":
          message = await Command.joinChannel(
            message,
            message.username,
            cmd[1]
          );
          refresh(message.username);
          io.emit("message", message);
          break;
        case "/quit":
          message = await Command.quitChannel(
            message,
            message.username,
            cmd[1]
          );
          refresh(message.username);
          io.emit("message", message);
          break;
        case "/users":
          message = await Command.getUserChannel(
            message,
            message.channel_name,
            cmd[1]
          );
          io.emit("message", message);
          break;
        case "/msg":
          message = Command.privateMsg(message, cmd[1]);
          io.emit("message", message);
          break;

        default:
          console.log(`Wrong command.`);
          message.senderName = "Console";
          message.text = "Sorry, wrong command.";
          io.emit("message", message);
      }
    } else {
      message.destName = "All";
      MongoCo.saveMessage(
        message.channel_id,
        message.text,
        message.senderName,
        message.destName,
        message.id
      );

      io.emit("message", message);
    }
  });
});
