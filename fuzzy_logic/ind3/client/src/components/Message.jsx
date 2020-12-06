import styled from 'styled-components'

export default function Message({ text }) {
    return (
        <Container>
            { text }
        </Container>
    )
}

const Container = styled.div`

`