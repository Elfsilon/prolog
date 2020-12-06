import styled from 'styled-components'

import { IElement, CreateButton } from './'

export default function ESBlock({ title, data, onInsert, onItemClick }) {
    return (
        <Container>
            <RowWrapper>
                <Title>{ title }</Title>
                <CreateButton width='30px' height='30px' callback={onInsert} />
            </RowWrapper>
            <Wrapper>
            {
                data.map(d => (
                    <ListItem key={d.id} onClick={() => onItemClick(d.id)}>
                        <IElement text={d.name} width='100%' height='30px' fontSize='15px' />
                    </ListItem>
                ))
            }
            </Wrapper>
        </Container>
    )
}

const Container = styled.div``

const RowWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 25px;
    justify-content: space-between;
    align-items: center;
`

const Wrapper = styled.div`

`

const Title = styled.h4`
    margin: 0;
    
`

const ListItem = styled.div`
    margin-bottom: 10px;
`