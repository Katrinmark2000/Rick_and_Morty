import styled from 'styled-components';
import arrowDown from '../../assets/chevron-down.png';

export function ArrowDownIcon({ $isOpen }) {
  return <ArrowIcon src={arrowDown} alt="Стрелка вниз" $isOpen={$isOpen} />;
}

const ArrowIcon = styled.img`
  transition: transform 0.2s;
  width: 16px;
  height: 16px;

  ${(props) =>
    props.$isOpen &&
    `
    transform: rotate(180deg);
  `}
`;
