import styled, { css } from 'styled-components';
import { useState } from 'react';
import { ArrowDownIcon } from './LogoArrow';

export function Dropdown({ idDropdown, placeholder, optionsData, onChange }) {
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

  const displayText = optionsData.find((opt) => opt.value === selectedOption)
    ?.text;

  return (
    <DropdownWrapper $isOpen={isOpen}>
      <Button type="button" id={idDropdown} onClick={handleClick}>
        {!selectedOption ? (
          <Placeholder>{placeholder}</Placeholder>
        ) : (
          <span>{displayText || placeholder}</span>
        )}

        <ArrowDownIcon />
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

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      ${Button} {
        border-bottom: 1px solid transparent;
        border-radius: 12px 12px 0 0;

        &::after {
          position: absolute;
          inset: 1px;
          z-index: 0;
          border-bottom: 1px solid var(--color-disabled);
          border-radius: 11px;
          content: '';
        }
      }
    `}
`;

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 10px 20px;
  color: var(--color-text-primary);
  font-size: inherit;
  font-family: inherit;
  background: none;
  border: 1px solid var(--color-text-caption);
  border-radius: 12px;
  cursor: pointer;
`;

const Placeholder = styled.span`
  color: var(--color-text-caption);
`;

const DropdownList = styled.ul`
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  margin-top: -1px;
  padding: 4px 0 8px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-text-caption);
  border-top: none;
  border-radius: 0 0 12px 12px;
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding-left: 20px;
  color: var(--color-text-primary);
  font-size: inherit;
  font-family: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-disabled);
  }

  ${({ $selected }) =>
    $selected &&
    css`
      color: var(--color-primary-pressed);
    `}
`;

const ItemText = styled.div`
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
