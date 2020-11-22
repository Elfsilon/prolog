import { useState } from 'react'
import styled from 'styled-components'

function AddWindow({ text1, text2, button1, button2, applyHandler, closeHandler }) {
    const [algName, setAlgName] = useState("")

    return (
        <Container>
            <Text>{ text1 }</Text>
            <Text>{ text2 }</Text>
            <InputField type='text' value={algName} onChange={(e) => setAlgName(e.target.value)} />
            <Wrapper>
                <Button onClick={() => applyHandler(algName)}>{ button1 }</Button>
                <Button onClick={closeHandler}>{ button2 }</Button>
            </Wrapper>
        </Container>
    );
}

export default AddWindow

const Container = styled.div`
    background-color: #FFFFFF;
    border-radius: 15px;
    padding: 40px 30px;
`

const Wrapper = styled.div``

const InputField = styled.input`
    background: none;
    padding: 5px;
    color: black;
    border-radius: 5px;
    border: 1px solid rgba(33, 33, 33, 0.2);
    outline: none;
    width: 100%;

    &:focus {
        border-color: #3571AA;
    }
`

const Text = styled.p`
    margin: 0 0 8px 0;
`

const Button = styled.button`
    outline: none;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #333333;
    color: white;
    margin-top: 8px;
    margin-right: 10px;
    font-size: 14px;
`