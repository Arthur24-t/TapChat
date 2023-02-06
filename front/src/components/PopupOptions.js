import "../css/PopupOptions.css";
import Option from "./PopupOptions/Option";
import QuitButton from "./QuitButton";
import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../page/Login";
import { Socket } from "socket.io-client";

const PopupOption = (id) => {
  document.getElementById(id)?.classList.remove("invisible");
};

const quit = (id) => {
  document.getElementById(id)?.classList.add("invisible");
};

const SendOptionBtn = styled.button`
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
  margin: 10% auto 6% auto;
  height: 2rem;
  width: 85%;
  background-color: lightgrey;
  border: 1px solid white;
  border-radius: 30px;
  text-align: center;
  font-size: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  color: white;
`;

const Hr = styled.hr`
  color: white;
`;

function PopupOptions(props) {
  const navigate = useNavigate();

  function disconnect() {
    localStorage.clear();
    navigate("/");
  }

  const ChgPseudo = () => {
    let pseudo = document.getElementById("newPseudo").value;
    let name = localStorage.getItem("name");
    props.socket.emit("chgPseudo", name, pseudo);
  };

  return (
    <>
      <div id="PopupOptions" className="PopupOptions invisible">
        <QuitButton quit={() => quit("PopupOptions")} />
        <Option
          name="Changer de pseudo"
          fonction={() => PopupOption("pseudo_div")}
        ></Option>
        <Hr />
        <Option name="Deconnexion" fonction={() => disconnect()}></Option>
      </div>
      <div id="pseudo_div" className="PopupPseudoChg invisible">
        <QuitButton quit={() => quit("pseudo_div")} />
        <Title>Nouveau pseudo:</Title>

        <Input id="newPseudo" type="text" />
        <SendOptionBtn
          onClick={() => {
            ChgPseudo();
            quit("pseudo_div");
          }}
        >
          Send
        </SendOptionBtn>
      </div>
    </>
  );
}

export default PopupOptions;
