import { useState } from 'react'
import styled from 'styled-components'
import { Question, AddWindow } from './components'


function App() {
  const [popular, setPopular] = useState(0)
  const [graph, setGraph] = useState(0)
  const [search, setSearch] = useState(0)
  const [web, setWeb] = useState(0)
  const [sort, setSort] = useState(0)
  const [optimization, setOptimization] = useState(0)
  const [crypto, setCrypto] = useState(0)
  const [life, setLife] = useState(0)
  const [hash, setHash] = useState(0)
  const [nonRecommended, setNonRecommended] = useState(0)
  const [machineLearning, setMachineLearning] = useState(0)
  const [result, setResult] = useState("")

  const [modalVisibility, setModalVisibility] = useState(false)

  const QUESTIONS = [
    {
      id: 1,
      title: "Question 1",
      text: "Popular?",
      name: "popular",
      values: [
        { id: 0, value: 2, text: 'Very popular' },
        { id: 1, value: 1, text: 'Popular' },
        { id: 2, value: 0, text: 'Common' },
      ],
      setter: setQuestion(setPopular),
    },
    {
      id: 2,
      title: "Question 2",
      text: "Graph?",
      name: "graph",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setGraph),
    },
    {
      id: 3,
      title: "Question 3",
      text: "Search?",
      name: "search",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setSearch),
    },
    {
      id: 4,
      title: "Question 4",
      text: "Web?",
      name: "web",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setWeb),
    },
    {
      id: 5,
      title: "Question 5",
      text: "Sort?",
      name: "sort",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setSort),
    },
    {
      id: 6,
      title: "Question 6",
      text: "Opt?",
      name: "optimization",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setOptimization),
    },
    {
      id: 7,
      title: "Question 7",
      text: "Crypto?",
      name: "crypto",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setCrypto),
    },
    {
      id: 8,
      title: "Question 8",
      text: "Life?",
      name: "life",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setLife),
    },
    {
      id: 9,
      title: "Question 9",
      text: "Hash?",
      name: "hash",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setHash),
    },
    {
      id: 10,
      title: "Question 10",
      text: "Non recommended?",
      name: "nonrecommended",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setNonRecommended),
    },
    {
      id: 11,
      title: "Question 11",
      text: "Machine learning?",
      name: "machinelearning",
      values: [
        { id: 0, value: 1, text: 'Yes' },
        { id: 1, value: 0, text: 'No' },
      ],
      setter: setQuestion(setMachineLearning),
    },
  ]

  function setQuestion(setter) {
    return function(value) {
      setter(value)
    }
  }

  async function showResult() {
    const guessURL = `http://localhost:5000/guess/${popular}/${graph}/${search}/${web}/${sort}/${optimization}/${crypto}/${life}/${hash}/${nonRecommended}/${machineLearning}`
    const response = await fetch(guessURL)
    if (response.ok === true) {
      const data = await response.json();
      console.log("DATA", data);
      if (data.props.data !== "Dont know") {
        setResult(data.props.data)
      } else {
        setModalVisibility(true)
      }
    }
  }

  async function addToDatabase(name) {
    const addURL = `http://localhost:5000/add/${name}/${popular}/${graph}/${search}/${web}/${sort}/${optimization}/${crypto}/${life}/${hash}/${nonRecommended}/${machineLearning}`
    fetch(addURL)
    setModalVisibility(false)
  }

  return (
    <Container>
      {
        modalVisibility === true ? (
          <ModalContainer>
            <AddWindow 
              text1="Sorry, I don't know the answer" 
              text2="Do you want to add it to the database?" 
              button1='Add' 
              button2='Close' 
              applyHandler={addToDatabase} 
              closeHandler={() => setModalVisibility(false)} 
            />
          </ModalContainer>
        ) : ""
      }
      <Content>
        {
          QUESTIONS.map(q => (
            <Question
              key={q.id}
              title={q.title} 
              text={q.text} 
              name={q.name} 
              values={q.values} 
              setter={q.setter} 
            />
          ))
        }
        <Button onClick={showResult}>Show Result</Button>
        <Text>{ result }</Text>
      </Content>
    </Container>
  )
}

export default App;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`

const ModalContainer = styled(Container)`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  height: 100vh;
  overflow: none;
  background-color: rgba(0, 0, 0, 0.7);
`

const Content = styled.div`
  width: 300px;
`

const Button = styled.button`
  
`

const Text = styled.p`
    margin: 0;
    font-size: 35px;
`