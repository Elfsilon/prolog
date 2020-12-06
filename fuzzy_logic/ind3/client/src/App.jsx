import { useState } from 'react'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import data from './data.json'

import { SelectES, ExpertSystem } from './pages'

function App() {
  return (
    <AppStyled>
      <Router>
        <Route exact path='/es-system/:systemID' component={ExpertSystem} />
        <Route 
          exact path='/'
          render={props => <SelectES {...props} data={data} />}
        />
      </Router>
    </AppStyled>
  )
}

export default App;

const AppStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F4F5FA;
`