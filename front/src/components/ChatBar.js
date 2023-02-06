import "../css/ChannelWindow.css";
import React from "react";

export class ChatBar extends React.Component {
  handleInput = (e) => {
    this.props.change_input_value({ input_value: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.send(this.input_value)} className="ChatBar">
        <input
          id="ChatBarMessage"
          onChange={this.handleInput}
          className="mess-input"
          type={Text}
          placeholder="Message"
        ></input>
        <button type="submit" className="send-btn"></button>
      </form>
    );
  }
}

export default ChatBar;
