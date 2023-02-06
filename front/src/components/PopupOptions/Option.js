import styled from "styled-components";

const Cliquable = styled.div`
  cursor: pointer;
  padding: 5% auto auto auto;
  margin: 5% auto auto auto;
`;

const Div = styled.div``;

const Option = (props) => {
  return (
    <>
      <Div>
        <Cliquable onClick={props.fonction}>{props.name}</Cliquable>
      </Div>
    </>
  );
};

export default Option;
