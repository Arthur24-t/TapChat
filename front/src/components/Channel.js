import React from "react";
import styled from "styled-components";

const Div_Channel = styled.div`
  border-radius: 10px;
  height: 11%;
  overflow-y: hidden;
  cursor: pointer;
  margin: 4% 5%;
  padding: 0 2% 0 2%;
  background-color: #4db6ac;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

const NomChannel = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: start;
  margin: 2%;
`;

const LastMessage = styled.p`
  margin: 0 auto 0 10%;
  padding-bottom: 5%;
  font-size: 1.2rem;
  text-align: start;
`;

const RemoveBtn = styled.div`
  position: relative;
  margin-top: 1%;
  display: flex;
  float: right;
  background-color: red;
  height: 15px;
  width: 15px;
  border: white 1px solid;
  border-radius: 50%;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
`;

export class Channel extends React.Component {
  click = () => {
    this.props.onClick(this.props.id);
  };

  RemoveChannel = () => {
    let data = {
      name: this.props.name,
      username: localStorage.getItem("name"),
    };
    this.props.socket.emit("remove", data);
  };

  render() {
    const { name, messages } = this.props;
    if (messages) {
      var lastMessage = messages.length - 1;
    }

    return (
      <Div_Channel onClick={this.click}>
        <RemoveBtn onClick={this.RemoveChannel}>x</RemoveBtn>
        <NomChannel>{name}</NomChannel>
        <LastMessage>
          {messages
            ? messages[lastMessage].senderName +
              ": " +
              messages[lastMessage].text
            : null}
        </LastMessage>
      </Div_Channel>
    );
  }
}
