import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { IElement } from '../components'

export default function SelectES({history, data}) {
    function redirect(id) {
        history.push("es-system/"+id, {
            data: data.find(d => d.id === id)
        })
    }

    return (
        <Container>
            <Title>THEMES</Title>
            <GridContainer>
            {
                data.map(d => (
                    <GridItem key={d.id} onClick={redirect.bind(null, d.id)}>
                        <IElement text={d.name} width='90%' height='75px' />
                    </GridItem>
                ))
            }
            </GridContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 750px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.h2`
    padding: 0;
    margin: 0 0 120px 0;
    font-size: 100px;
    text-align: center;
    font-weight: 400;
`

const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`

const GridItem = styled.div`
    width: 33.3%;
    display: flex;
    padding-bottom: 30px;
    justify-content: center;
    align-items: center;
`