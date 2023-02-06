import React from "react";
import { ChannelList } from "../components/ChannelList";
import { MessagesPanel } from "../components/MessagesPanel";
import socketClient from "socket.io-client";
import "../App.css";
import Logo from "../components/Logo.js";
import "../css/ChannelWindow.css";
import ProfileCircle from "../components/ProfileCircle";
import PopupOptions from "../components/PopupOptions.js";
const SERVER = "http://localhost:8080";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: null,
      socket: null,
      channel: null,
    };
  }
  socket;
  componentDidMount() {
    this.configureSocket();
  }

  configureSocket = () => {
    var socket = socketClient(SERVER);
    socket.on("connection", () => {
      if (this.state.channel) {
        this.handleChannelSelect(this.state.channel._id);
      }
    });

    socket.emit("sendInfo", localStorage.getItem("name"));

    socket.on("channel" + localStorage.getItem("name"), (channel) => {
      let channels = this.state.channels;
      channels.forEach((c) => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
      this.setState({ channels });
    });

    socket.on("getChannel-"+ localStorage.getItem("name"), (channel) => {
      this.setState({ channels: channel });
    });

    socket.on("getMessage-"+ localStorage.getItem("name"), (message) => {
      let channels = this.state.channels;
      if (channels != null) {
        channels.forEach((c) => {
          message.forEach((m) => {
            if (
              m.destName === localStorage.getItem("name") ||
              m.senderName === localStorage.getItem("name") ||
              m.destName === "All"
            ) {
              if (c._id === m.channel_id) {
                if (!c.messages) {
                  c.messages = [m];
                } else {
                  c.messages.push(m);
                }
              }
            }
          });
        });

        this.setState({ channels });
      }
    });

    socket.on("message", (message) => {
      let channels = this.state.channels;
      channels.forEach((c) => {
        if (
          message.destName === localStorage.getItem("name") ||
          message.senderName === localStorage.getItem("nickname") ||
          message.destName === "All" ||
          message.senderName === "Console"
        ) {
          if (c._id === message.channel_id) {
            if (!c.messages) {
              c.messages = [message];
            } else {
              {
                c.messages.push(message);
              }
            }
          }
        }
      });
      this.setState({ channels });
    });

    socket.on("nickname", (nickname) => {
      localStorage.setItem("nickname", nickname);
    });

    this.socket = socket;
  };

  handleChannelSelect = (id) => {
    let channel = this.state.channels.find((c) => {
      return c._id === id;
    });
    this.setState({ channel });
    this.socket.emit("channel-join", id, (ack) => {});
    setTimeout(this.ScrollDown, 0);
  };

  ScrollDown() {
    if (document.getElementById("message_list")) {
      let element = document.getElementById("message_list");
      element.scrollTop = element.scrollHeight;
    }
  }

  handleSendMessage = (channel_id, channel_name, text) => {
    this.socket.emit("send-message", {
      channel_id,
      channel_name,
      text,
      username: localStorage.getItem("name"),
      senderName: localStorage.getItem("nickname"),
      id: Date.now(),
    });
  };

  render() {
    return (
      <div className="App-body">
        <Logo></Logo>
        <ChannelList
          socket={this.socket}
          channels={this.state.channels}
          onSelectChannel={this.handleChannelSelect}
        />
        <MessagesPanel
          socket={this.socket}
          onSendMessage={this.handleSendMessage}
          channel={this.state.channel}
        />
        <ProfileCircle></ProfileCircle>
        <PopupOptions socket={this.socket}></PopupOptions>
      </div>
    );
  }
}
