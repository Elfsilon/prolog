import React from 'react';
import styled from 'styled-components';

function CheckBox({ name, value, checked=false, handleClick }) {
  return (
    <StyledCheckBox>
        <RadioWrapper onClick={handleClick}>
            <Radio name={name} value={value} defaultChecked={checked}/>
            <StyledRadio />
        </RadioWrapper>
    </StyledCheckBox>
  );
}

export default CheckBox;

const StyledCheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RadioWrapper = styled.div`
    position: relative;
    width: 18px;
    height: 18px;
`;

const StyledRadio = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
    border: 1px solid #D0D0D0;
    border-radius: 50%;
    transition: all 0.1s ease;
    &:after {
        content: '';
        position: absolute;
        left: 3px;
        top: 3px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #FF003D;
        display: none;
    }
`;

const Radio = styled.input.attrs(props => ({
    type: 'radio',
    name: props.name,
    value: props.value,
  }))`
      opacity: 0;
      position: absolute;
      width: 16px;
      height: 16px;
      margin: 0;
      padding: 0;
      z-index: 20;
      cursor: pointer;
      &:hover ~ ${StyledRadio} {
        border-color: #FF003D;
      }
      &:hover ~ ${StyledRadio}:after {
        background-color: #EF274B;
      }
  
      &:checked ~ ${StyledRadio}:after {
          display: block;
      }
  `;
