import styled from 'styled-components'

export default function IElement({ callback, text, width='100%', height='100%', fontSize='14px', interactive=true }) {
    return (
        <Container width={width} height={height} fontSize={fontSize} onClick={callback} interactive={interactive}>
            { text }
        </Container>
    )
}

const Container = styled.div`
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: center;
    font-size: ${props => props.fontSize};
    align-items: center;
    width: ${props => props.width};
    height: ${props => props.height};
    box-shadow: -5px 5px 10px 0 rgba(91, 81, 81, 0.15);
    user-select: none;
    cursor: ${props => props.interactive ? 'pointer' : 'default'};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${props => props.interactive ? 'black' : 'white'};
        color: ${props => props.interactive ? 'white' : 'black'};
    }
`