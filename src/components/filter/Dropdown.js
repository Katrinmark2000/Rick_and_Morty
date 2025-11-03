import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ArrowDownIcon } from './LogoArrow';

export function Dropdown({
  value,
  idDropdown,
  placeholder,
  optionsData,
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value) => {
    setSelectedOption(value);
    onChange?.(value);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedOption(value || '');
  }, [value]);

  const displayText = optionsData.find((opt) => opt.value === value)?.text;

  return (
    <DropdownWrapper $isOpen={isOpen}>
      <Button
        type="button"
        id={idDropdown}
        onClick={handleClick}
        $isOpen={isOpen}
      >
        {!selectedOption ? (
          <Placeholder>{placeholder}</Placeholder>
        ) : (
          <DisplayText>{displayText}</DisplayText>
        )}

        <ArrowDownIcon $isOpen={isOpen} />
      </Button>

      {isOpen && (
        <DropdownList id={`${idDropdown}-listbox`}>
          {optionsData.map((option) => (
            <OptionItem
              key={option.value}
              $selected={option.value === selectedOption}
              onClick={() => handleSelect(option.value)}
            >
              <ItemText>{option.text}</ItemText>
            </OptionItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
}

/* Styled Components */
const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 180px;
  max-height: 40px;
  border-radius: 8px;
`;

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 40px;
  padding: 12px 16px;
  color: #fff;
  font-size: inherit;
  font-family: inherit;
  background: ${({ $isOpen }) => ($isOpen ? '#334466' : '#263750')};
  border: 1px solid #83bf46;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #334466;
  }

  @media (max-width: 950px) {
    width: 150px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;

const Placeholder = styled.span`
  color: #b3b3b3;
`;

const DisplayText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DropdownList = styled.ul`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.1);
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'regular')};
  border: none;
  cursor: pointer;
  padding: 10px 0 10px 8px;

  &:hover {
    background: #83bf4633;
    cursor: pointer;
  }
`;

const ItemText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
