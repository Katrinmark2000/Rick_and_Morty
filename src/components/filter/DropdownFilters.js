import { useData } from '../providers/DataProvider';
import { Dropdown } from './Dropdown';

export function DropdownFilter() {
  const { characters } = useData();

  const uniqueStatuses = [...new Set(characters.map((char) => char.status))];
  const statusOptions = uniqueStatuses.map((status, index) => ({
    value: `status-${index}`,
    text: status
  }));

  const uniqueGender = [...new Set(characters.map((char) => char.gender))];
  const genderOptions = uniqueGender.map((gender, index) => ({
    value: `gender-${index}`,
    text: gender
  }));

  const uniqueSpecies = [...new Set(characters.map((char) => char.species))];
  const nameOptions = uniqueSpecies.map((species, index) => ({
    value: `species-${index}`,
    text: species
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
