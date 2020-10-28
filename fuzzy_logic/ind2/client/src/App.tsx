import React, { useState, ChangeEvent, useEffect, MouseEvent } from 'react';
import styled from 'styled-components';

const URL = 'http://localhost:5000/';

interface DBDataShape {
  id: number;
  extraversion: number;
  neuroticism: number;
  lie: number;
  result: string;
}

function App() {
  const [ext, setExt] = useState(0);
  const [neu, setNeu] = useState(0);
  const [lie, setLie] = useState(0);
  const [type, setType] = useState("");
  const [DBData, setDBData] = useState<DBDataShape[] | null>(null);

  const [extAdd, setExtAdd] = useState(0);
  const [neuAdd, setNeuAdd] = useState(0);
  const [lieAdd, setLieAdd] = useState(0);
  const [resAdd, setResAdd] = useState("");

  const changeExt = (e: ChangeEvent<HTMLInputElement>) => {
    setExt(+(e.target as HTMLInputElement).value);
  }

  const changeNeu = (e: ChangeEvent<HTMLInputElement>) => {
    setNeu(+(e.target as HTMLInputElement).value);
  }

  const changeLie = (e: ChangeEvent<HTMLInputElement>) => {
    setLie(+(e.target as HTMLInputElement).value);
  }

  const changeExtAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setExtAdd(+(e.target as HTMLInputElement).value);
  }

  const changeNeuAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setNeuAdd(+(e.target as HTMLInputElement).value);
  }

  const changeLieAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setLieAdd(+(e.target as HTMLInputElement).value);
  }

  const changeResAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setResAdd((e.target as HTMLInputElement).value);
  }

  useEffect(() => {
    fetch(URL).then(res => res.json()).then((data)  => {
      setDBData([...(data.props.data as DBDataShape[])]);
    });
  }, []);

  const DBRem = (event: MouseEvent<HTMLSpanElement>): void => {
    const p = event.target as HTMLSpanElement;
    if (p != null) {
      const id = +p.innerText.split(' ')[0]
      if (DBData) {
        setDBData([...DBData.filter((el: DBDataShape) => el.id != id)]);
      }
    }
  }

  const DBAdd = () => {
    const toPaste: DBDataShape = {
      id: 99,
      extraversion: extAdd,
      neuroticism: neuAdd,
      lie: lieAdd,
      result: resAdd,
    }
    if (DBData) {
      fetch(URL + `/add/${extAdd}/${neuAdd}/${lieAdd}/${resAdd}`);
      setDBData([...DBData, toPaste])
    }
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
      <SideBar>
        {
          DBData != null ?
          DBData.map((row: DBDataShape, index: number) => (
            <DBRow>
              <DBDataRow>{`${row.id} :: ${row.extraversion} | ${row.neuroticism} | ${row.lie} | ${row.result}`}</DBDataRow>
              <DBRemove onClick={DBRem}>{`${index} rem`}</DBRemove>
            </DBRow>
          )) : null
        }
        <DBInput value={extAdd} onChange={changeExtAdd}></DBInput>
        <DBInput value={neuAdd} onChange={changeNeuAdd}></DBInput>
        <DBInput value={lieAdd} onChange={changeLieAdd}></DBInput>
        <DBInput value={resAdd} onChange={changeResAdd}></DBInput>
        <DBButton onClick={DBAdd}>ADD</DBButton>
      </SideBar>
    </AppStyled>
  );
}

export default App;

const AppStyled = styled.div`
  position: relative;
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

const DBButton = styled.button`
    padding: 5px 7px;
    border-radius: 15px;
    outline: none;
    background-color: #FF6086;
    font-size: 13px;
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

const DBInput = styled.input`
    border-radius: 15px;
    outline: none;
    background-color: #FFEEF6;
    border: none;
    height: 20px;
    font-size: 13px;
    color: black;
    text-align: center;
    width: 30%;
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

const SideBar = styled.div`
  width: 300px;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 20px;
  font-size: 13px;
  cursor: default;
`;

const DBRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 0;
`;

const DBRemove = styled.span`
  cursor: pointer;
  color: #555555;
`;

const DBDataRow = styled.p`
  color: #555555;
  margin-right: 10px;
`;