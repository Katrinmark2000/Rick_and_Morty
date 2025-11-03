import styled from 'styled-components';
import arrowDown from '../../assets/chevron-down.png';

export function ArrowDownIcon({ $isOpen }) {
  return <ArrowIcon src={arrowDown} alt="Стрелка вниз" $isOpen={$isOpen} />;
}

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  transition: transform 0.25s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
