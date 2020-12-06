import styled from 'styled-components'

import { IElement } from './'

export default function Modal({ title, message, onClose, component=null }) {
    return (
        <Container>
            <Content>
                <Title>{ title }</Title>
                {
                    component !== null ? component : (
                        <Message>{ message }</Message>
                    )
                }
                <Wrapper>
                    <IElement text='Close' callback={onClose} height='30px' />
                </Wrapper>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(33, 33, 33, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

const Content = styled.div`
    width: 300px;
    padding: 30px;
    border-radius: 10px;
    background-color: #F4F5FA;
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

const Message = styled.p`
    white-space: pre-wrap
`

const Title = styled.h5`

`