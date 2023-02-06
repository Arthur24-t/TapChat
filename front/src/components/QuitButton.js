import styled from "styled-components";

const Bouton = styled.button`
  float: right;
  height: 30px;
  width: 30px;
  margin: 1% 2% auto auto;
  border-radius: 30px;
  border: 2px solid white;
  background-color: #4db6ac;
  cursor: pointer;
`;

const QuitButton = (quit) => {
  return (
    <div>
      <Bouton onClick={quit.quit}>X</Bouton>
    </div>
  );
};
export default QuitButton;
