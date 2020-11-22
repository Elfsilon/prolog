import React from 'react'
import styled from 'styled-components'

import CheckBox from './CheckBox'

function Question({ title, text, name, values, setter }) {
    function handleClick(event) {
        setter(event.target.value)
    }

    function renderCheckBox(key, name, text, value, handler) {
        return (
            <CheckBoxMargin key={key}>
                <CheckBox name={name} value={value} checked={false} handleClick={handler}/>
                <TextRadio>{ text }</TextRadio>
            </CheckBoxMargin>
        )
    }

    return (
        <Container>
            <Title>{ title }</Title>
            <Text>{ text }</Text>
            <CheckBoxesWrapper>
                { values.map(v => renderCheckBox(v.id, name, v.text, v.value, handleClick))}
            </CheckBoxesWrapper>
        </Container>
    )
}

export default Question;

const Container = styled.div`
    width: 100%;
    margin-bottom: 40px;
`

const Title = styled.h3`
    margin: 0 0 10px 0;
    padding: 0;
    font-size: 14px;
    color: #CCCCCC;
`

const Text = styled.p`
    margin: 0;
    font-size: 20px;
    padding-bottom: 20px;
`

const TextRadio = styled(Text)`
    margin-left: 5px;
    font-size: 15px;
    padding: 0;
`

const CheckBoxesWrapper = styled.div`
    display: flex;
`

const CheckBoxMargin = styled.div`
    display: flex;
    margin-right: 18px;
`