import { useData } from '../providers/DataProvider';
import { Dropdown } from './Dropdown';

export function DropdownFilter() {
  const { characters } = useData();

  const statusOptions = characters.map((character) => ({
    value: character.id.toString(),
    text: character.status
  }));

  const genderOptions = characters.map((character) => ({
    value: character.id.toString(),
    text: character.gender
  }));

  const nameOptions = characters.map((character) => ({
    value: character.id.toString(),
    text: character.species
  }));

  return (
    <>
      <Dropdown
        idDropdown="status-filter"
        placeholder="status"
        optionsData={statusOptions}
        onChange={(selectedId) => {
          const selectedCharacter = characters.find(
            (char) => char.id.toString() === selectedId
          );
          console.log('Выбран статус:', selectedCharacter.status);
        }}
      />
      <Dropdown
        idDropdown="gender-filter"
        placeholder="gender"
        optionsData={genderOptions}
        onChange={(selectedId) => {
          const selectedCharacter = characters.find(
            (char) => char.id.toString() === selectedId
          );
          console.log('Выбран гендер:', selectedCharacter.gender);
        }}
      />
      <Dropdown
        idDropdown="species-filter"
        placeholder="species"
        optionsData={nameOptions}
        onChange={(selectedId) => {
          const selectedCharacter = characters.find(
            (char) => char.id.toString() === selectedId
          );
          console.log('Выбран персонаж:', selectedCharacter.species);
        }}
      />
    </>
  );
}
