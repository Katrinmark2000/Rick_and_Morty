import styled from 'styled-components';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDownIcon } from './LogoArrow';
import { ReactComponent as CrossIcon } from '../../assets/cross-icon.svg';
import { ReactComponent as CrossIconGreen } from '../../assets/cross-icon-green.svg';

export function Dropdown({
  value,
  idDropdown,
  placeholder,
  optionsData,
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isHover, setIsHover] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const handleSelect = useCallback(
    (value) => {
      setSelectedOption(value);
      onChange?.(value);
      setIsOpen(false);
    },
    [setSelectedOption, setIsOpen, onChange]
  );

  const createSelectHandler = useCallback(
    (value) => () => handleSelect(value),
    [handleSelect]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  useEffect(() => {
    setSelectedOption(value || '');
  }, [value]);

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      setSelectedOption('');
      onChange?.('');
    },
    [setSelectedOption, onChange]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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

        <IconsWrapper>
          {selectedOption ? (
            <CrossWrapper
              onClick={handleClear}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {isHover ? <CrossIconGreen /> : <CrossIcon />}
            </CrossWrapper>
          ) : (
            <ArrowDownIcon $isOpen={isOpen} />
          )}
        </IconsWrapper>
      </Button>

      {isOpen && (
        <DropdownList id={`${idDropdown}-listbox`} ref={dropdownRef}>
          {optionsData.map((option) => (
            <OptionItem
              key={option.value}
              $selected={option.value === selectedOption}
              onClick={createSelectHandler(option.value)}
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
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 45px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.1);
  max-height: 197px;
  overflow: auto;
  position: absolute;
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

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CrossWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    transition: all 0.2s ease;
  }
`;
