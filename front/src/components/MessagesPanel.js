import React from "react";
import "../css/ChannelWindow.css";
import { Message } from "./Message";
import styled from "styled-components";
import QuitButton from "./QuitButton";

const DivChannel = styled.div`
  margin: 0% auto;
  display: flex;
  flex-direction: row;
`;

const TitreChannel = styled.h3`
  margin: 1% auto;
`;

const BoutonRename = styled.div`
  display: flex;
  float: right;
  background-color: lightblue;
  height: 10px;
  width: 10px;
  border: 0.5px white solid;
  border-radius: 50%;
  justify-content: center;
  cursor: pointer;
`;

const AddChannelTitle = styled.p`
  font-weight: bold;
  margin-top: 0;
`;

const SendName = styled.button`
  content: "Send";
  height: 2rem;
  width: 5rem;
  background-color: #4db6ac;
  border-radius: 30px;
  border: 2px solid white;
  margin: 0 auto 3% auto;
  cursor: pointer;
`;

const Input = styled.input`
  type: text;
  margin: 0 auto 2% auto;
  height: 1.5rem;
  width: 80%;
  background-color: lightgrey;
  border: 1px solid white;
  border-radius: 30px;
  text-align: center;
  font-size: 1rem;
`;

export class MessagesPanel extends React.Component {
  state = { input_value: "" };

  send = (event) => {
    event.preventDefault();
    if (this.state.input_value && this.state.input_value != "") {
      this.props.onSendMessage(
        this.props.channel._id,
        this.props.channel.name,
        this.state.input_value
      );
      this.setState({ input_value: "" });
    }
    setTimeout(this.ScrollDown, 100);
  };

  ScrollDown() {
    if (document.getElementById("message_list")) {
      let element = document.getElementById("message_list");
      element.scrollTop = element.scrollHeight;
    }
  }

  PopupOption = (id) => {
    document.getElementById(id)?.classList.remove("invisible");
  };

  quit = (id) => {
    document.getElementById(id)?.classList.add("invisible");
  };

  RenameChannel = () => {
    let name = document.getElementById("input_rename").value;
    let data = {
      id: this.props.channel._id,
      name: name,
      username: localStorage.getItem("name"),
    };
    this.props.socket.emit("renameChannel", data);
  };

  handleInput = (e) => {
    this.setState({ input_value: e.target.value });
  };

  render() {
    let list = (
      <div className="no-content-message">There is no messages to show</div>
    );
    if (this.props.channel && this.props.channel.messages) {
      list = this.props.channel.messages.map((m) => (
        <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />
      ));
    }

    return (
      <div id="ChannelWindow" className="ChannelWindow">
        {this.props.channel ? (
          <DivChannel>
            <TitreChannel>{this.props.channel?.name}</TitreChannel>
            <BoutonRename
              onClick={() => this.PopupOption("RenameChannel")}
            ></BoutonRename>
          </DivChannel>
        ) : null}

        <div id="message_list" className="messages-list">
          {list}
        </div>
        {this.props.channel && (
          <form onSubmit={this.send} className="ChatBar">
            <input
              type="text"
              onChange={this.handleInput}
              className="mess-input"
              value={this.state.input_value}
              placeholder="Message"
            />
            <button
              type="submit"
              onClick={this.send}
              className="send-btn"
            ></button>
          </form>
        )}

        <div id="RenameChannel" className="rename invisible">
          <QuitButton quit={() => this.quit("RenameChannel")} />
          <AddChannelTitle>New channel name :</AddChannelTitle>
          <Input id="input_rename"></Input>
          <SendName
            onClick={() => {
              this.RenameChannel();
              this.quit("RenameChannel");
            }}
          >
            Send
          </SendName>
        </div>
      </div>
    );
  }
}
