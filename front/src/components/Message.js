import React from "react";
import "../css/Message.css";

export class Message extends React.Component {
  render() {
    return (
      <div className="message">
        <div className="username">
          <b>{this.props.senderName}</b>
        </div>
        <span className="message">{this.props.text}</span>
      </div>
    );
  }
}
