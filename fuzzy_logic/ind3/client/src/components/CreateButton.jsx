import styled from 'styled-components'

import icon from '../assets/plus.svg'

export default function CreateButton({ callback, width='32px', height='32px' }) {
    return (
        <Container width={width} height={height} onClick={callback}>
            <Icon src={icon} alt='Add' />
        </Container>
    )
}

const Container = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`

const Icon = styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover{
        transform: rotate(90deg)
    }
`