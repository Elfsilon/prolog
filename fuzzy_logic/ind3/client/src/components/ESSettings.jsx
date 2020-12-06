import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { IElement, CreateButton, Matrix, Message, SettingsRow } from './'

import plusIcon from '../assets/plus.svg'
import editIcon from '../assets/edit.svg'
import plussIcon from '../assets/plus.svg'
import minusIcon from '../assets/minus.svg'
import previousIcon from '../assets/previous.svg'
import nextIcon from '../assets/next.svg'
import toolsIcon from '../assets/tools.svg'

export default function ESSettings({ type, data, factors, objects, isExpert, onChangeMatrix, onChangeName, onChangeRatio }) {
    const [selectedFactorID, setSelectedFactorID] = useState(0)
    const [dataName, setDataName] = useState('')

    useEffect(() => {
        setDataName(data.name)
    }, [data])

    function changeName(val) {
        onChangeName(type, data.id, val)
    }

    function incRatio() {
        if (+data.ratio + 0.1 <= 1) {
            
            const ratio = (+data.ratio + 0.1).toFixed(1)
            onChangeRatio(type, data.id, ratio)
        }
    }

    function decRatio() {
        if (+data.ratio - 0.1 >= 0) {
            const ratio = (+data.ratio - 0.1).toFixed(1)
            onChangeRatio(type, data.id, ratio)
        }
    }

    function nextMatrix() {
        if (selectedFactorID < factors.length - 1) {
            setSelectedFactorID(selectedFactorID + 1)
        }
    }

    function prevMatrix() {
        if (selectedFactorID > 0) {
            setSelectedFactorID(selectedFactorID - 1)
        }
    }

    function onMatrixCellChanged(i, j, value) {
        onChangeMatrix(i, j, value, selectedFactorID, data.id)
    }

    return (
        <Container>
            <Wrapper>
                <TextInput 
                    value={dataName} 
                    onChange={e => setDataName(e.target.value)} 
                    onBlur={() => changeName(dataName)} 
                />
                <Title>Settings</Title>
            </Wrapper>
            <ContentWrapper>
                <SettingsRow 
                    title='Name' 
                    text={data.name} 
                    icon1={editIcon} 
                    callback1={() => console.log('click on edit name button')} 
                />
                {
                    data.ratio ? (
                        <SettingsRow 
                            title='Ratio' 
                            text={data.ratio} 
                            icon1={minusIcon} 
                            icon2={plusIcon}
                            callback1={decRatio}
                            callback2={incRatio}
                        />
                    ) : null
                }
                {
                    isExpert ? (
                        <SettingsRow 
                            title='Factor' 
                            text={factors[selectedFactorID].name} 
                            icon1={previousIcon} 
                            icon2={nextIcon}
                            callback1={prevMatrix}
                            callback2={nextMatrix}
                        />
                    ) : null
                }
            </ContentWrapper>
            {
                isExpert ? (
                    <Matrix 
                        objects={objects} 
                        matrix={data.matrix[selectedFactorID]} 
                        onCellChanged={onMatrixCellChanged} 
                    />
                ) : null
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
`

const Title = styled.h4`
    margin: 0;
    font-size: 25px;
    font-weight: 400;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 32px 0;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TextInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: white;
    width: 50%; 
    height: 30px;
    font-size: 15px;
    box-shadow: -5px 5px 10px 0 rgba(91, 81, 81, 0.15);
    transition: all 0.2s ease;
`