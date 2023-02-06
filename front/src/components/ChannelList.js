import React from "react";
import "../css/ChannelList.css";
import { Channel } from "./Channel";
import styled from "styled-components";
import QuitButton from "./QuitButton";

const AddChannelBtn = styled.div`
  width: 80%;
  margin: auto;
  background-color: green;
  display: flex;
  height: 7%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
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
  margin: auto auto 3% auto;
  cursor: pointer;
`;

const Input = styled.input`
  type: text;
  margin: 0 auto 6% auto;
  height: 1.5rem;
  width: 80%;
  background-color: lightgrey;
  border: 1px solid white;
  border-radius: 30px;
  text-align: center;
  font-size: 1rem;
`;

export class ChannelList extends React.Component {
  AddChannel = () => {
    let name = document.getElementById("input_name").value;
    let data = { name: name, username: localStorage.getItem("name") };
    this.props.socket.emit("create", data);
  };

  handleClick = (id) => {
    this.props.onSelectChannel(id);
  };

  PopupOption = (id) => {
    document.getElementById(id)?.classList.remove("invisible");
  };

  quit = (id) => {
    document.getElementById(id)?.classList.add("invisible");
  };

  render() {
    let list = (
      <div className="no-content-message">There is no channels to show</div>
    );
    if (this.props.channels && this.props.channels.map) {
      list = this.props.channels.map((c) => (
        <Channel
          socket={this.props.socket}
          channel={c}
          key={c._id}
          messages={c.messages}
          id={c._id}
          name={c.name}
          participants={c.participants}
          onClick={this.handleClick}
        />
      ));
    }
    return (
      <div className="ChannelList">
        <h3>Channel List</h3>
        <div className="liste">{list}</div>

        <AddChannelBtn onClick={() => this.PopupOption("NewChannelName")}>
          <AddChannelTitle>Add Channel</AddChannelTitle>
        </AddChannelBtn>

        <div id="NewChannelName" className="input_name invisible">
          <QuitButton quit={() => this.quit("NewChannelName")} />
          <AddChannelTitle>Channel name:</AddChannelTitle>
          <Input id="input_name"></Input>
          <SendName
            onClick={() => {
              this.AddChannel();
              this.quit("NewChannelName");
            }}
          >
            Send
          </SendName>
        </div>
      </div>
    );
  }
}
