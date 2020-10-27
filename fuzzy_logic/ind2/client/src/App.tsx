import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const URL = 'http://localhost:5000/';

function App() {
  const [ext, setExt] = useState(0);
  const [neu, setNeu] = useState(0);
  const [lie, setLie] = useState(0);
  const [type, setType] = useState("");

  const changeExt = (e: ChangeEvent<HTMLInputElement>) => {
    setExt(+(e.target as HTMLInputElement).value);
  }

  const changeNeu = (e: ChangeEvent<HTMLInputElement>) => {
    setNeu(+(e.target as HTMLInputElement).value);
  }

  const changeLie = (e: ChangeEvent<HTMLInputElement>) => {
    setLie(+(e.target as HTMLInputElement).value);
  }

  const getType = () => {
    fetch(URL + `solution/${ext}/${neu}/${lie}`)
    .then(res => res.json())
    .then(data => {
      setType(data.props.data);
    });    
  }

  return (
    <AppStyled>
      <Container>
        <Row>
          <UserInput value={ext} onChange={changeExt}></UserInput>
          <Text>Extraversion (0-24)</Text>
        </Row>
        <Row>
          <UserInput value={neu} onChange={changeNeu}></UserInput>
          <Text>Neuroticism (0-25)</Text>
        </Row>
        <Row>
          <UserInput value={lie} onChange={changeLie}></UserInput>
          <Text>Lie (0-8)</Text>
        </Row>
        <Container> 
          <BigText>You are {type}</BigText>
          <Button onClick={getType}>GET TYPE</Button>
        </Container>
      </Container>
    </AppStyled>
  );
}

export default App;

const AppStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
    padding: 15px 35px;
    border-radius: 15px;
    outline: none;
    background-color: #FF6086;
    font-size: 20px;
    color: white;
    border: none;
    transition: all 0.3s ease;

    &:hover {
        background-color: #FF3C6A;
    }
`;

const UserInput = styled.input`
    border-radius: 15px;
    outline: none;
    background-color: #FFEEF6;
    border: none;
    height: 40px;
    font-size: 18px;
    color: black;
    text-align: center;
    width: 25%;
    transition: all 0.3s ease;

    &:hover {
        background-color: #FFE1E8;
    }
`;

const Row = styled.div`
    display: flex;
    margin-bottom: 10px;
    width: 200px;
    justify-content: space-between;
    align-items: center;

    &::last-child {
      margin-bottom: 0;
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
    font-size: 18px;
    color: black;
    width: 120px;
`;

const BigText = styled.p`
    font-size: 25px;
    color: black;
    margin-top: 45px;
`;