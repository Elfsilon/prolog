import React, { FC } from 'react';
import styled from 'styled-components';

interface PropTypes {
    title: string;
}

const Button: FC<PropTypes> = ({title}) => {
    return <ButtonStyled>{ title }</ButtonStyled>
}

export default Button;

const ButtonStyled = styled.button`
    padding: 5px;
    border-radius: 15px;
    outline: none;
    background-color: #FF6086;
    font-size: 20px;
    color: white;
    transition: all 0.3s ease;

    &:hover {
        background-color: #FF3C6A;
    }
`;