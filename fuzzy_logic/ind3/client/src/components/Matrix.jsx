import styled from 'styled-components'
import { useState, useEffect } from 'react'

function MatrixCell({ startValue, i, j, onCellChanged, disabled=false }) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(startValue)
    }, [startValue])

    function changeHandler(e) {
        onCellChanged(i, j, e.target.value)
    }

    return (
        <MatrixInput 
            type='text' 
            value={value} 
            onBlur={changeHandler} 
            onChange={e => setValue(e.target.value)} 
            disabled={disabled} 
        />
    ) 
}

export default function Matrix({ objects, matrix, onCellChanged }) {
    return (
        <Container>
            <MatrixRow>
                <MatrixEl></MatrixEl>
                {
                    objects.map(o => (
                        <MatrixEl key={o.id}>{ o.name }</MatrixEl>
                    ))
                }
            </MatrixRow>
            {
                matrix.map((row, rowIndex) => (
                    <MatrixRow key={rowIndex}>
                        <MatrixEl>{ objects[rowIndex].name }</MatrixEl>
                        {
                            row.map((el, colIndex) => {
                                const isDisabled = colIndex <= rowIndex
                                return (
                                    <MatrixEl key={colIndex}>
                                        <MatrixCell 
                                            startValue={el} 
                                            i={rowIndex} 
                                            j={colIndex} 
                                            onCellChanged={onCellChanged} 
                                            disabled={isDisabled} 
                                        />
                                    </MatrixEl>
                                )
                            })
                        }
                    </MatrixRow>
                ))
            }
        </Container>
    )
}

const Container = styled.div``

const MatrixRow = styled.div`
    display: flex;
    margin-bottom: 5px;
`

const MatrixEl = styled.div`
    width: 60px;
    height: 30px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MatrixInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: white;
    font-size: 12px;
    width: 100%;
    height: 100%;
    box-shadow: -5px 5px 10px 0 rgba(91, 81, 81, 0.15);
    transition: all 0.2s ease;

    &:disabled {
        opacity: 0.5;
    }
`