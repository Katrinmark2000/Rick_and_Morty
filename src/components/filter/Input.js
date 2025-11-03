import React from 'react';
import styled from 'styled-components';

export function Input({ value, onChange, placeholder, type, name, disabled }) {
  return (
    <StyledInput
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

/* Styled Components */
const StyledInput = styled.input`
  padding: 12px 16px;
  background: #263750;
  font-size: 16px;
  border: 1px solid #83bf46;
  border-radius: 8px;
  outline: none;
  width: 180px;
  height: 40px;
  color: #fff;

  &::placeholder {
    color: #b3b3b3;
    opacity: 1;
  }

  &:focus {
    background: #334466;
  }

  &:hover {
    background: #334466;
    cursor: pointer;
  }

  @media (max-width: 950px) {
    width: 150px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;
