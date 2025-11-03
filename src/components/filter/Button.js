import React from 'react';
import styled from 'styled-components';

export function Button({ onClick, children, variant }) {
  return (
    <StyledButton onClick={onClick} type="button" $variant={variant}>
      {children}
    </StyledButton>
  );
}

const colors = {
  green: '#83bf46',
  red: '#ff5152'
};

/* Styled Components */
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 40px;
  padding: 12px 16px;
  color: ${({ $variant }) => colors[$variant]};
  font-size: inherit;
  font-family: inherit;
  background: none;
  border: 1px solid ${({ $variant }) => colors[$variant]};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${({ $variant }) => colors[$variant]};
    color: white;
  }

  &:active {
    background-color: ${({ $variant }) => colors[$variant]};
    color: white;
  }

  @media (max-width: 950px) {
    width: 70px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;
