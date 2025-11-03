import styled from 'styled-components';
import { useData } from '../providers/DataProvider';
import { Dropdown } from './Dropdown';
import { Input } from './Input';
import { Button } from './Button';
import { useState, useEffect } from 'react';

export function DropdownFilter() {
  const { characters, fetchData, setActivePage, setApiURL } = useData();
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = async () => {
    const params = new URLSearchParams();

    if (filters.status) params.append('status', filters.status);
    if (filters.gender) params.append('gender', filters.gender);
    if (filters.species) params.append('species', filters.species);
    if (filters.name) params.append('name', filters.name);
    if (filters.type) params.append('type', filters.type);

    const query = params.toString();
    const url = `https://rickandmortyapi.com/api/character/?${query}`;

    setApiURL(url);
    setActivePage(0);
    window.history.replaceState(null, '', `?${query}`);

    await fetchData(url);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const filtersFromUrl = Object.fromEntries(searchParams.entries());

    //Если в URL есть параметры — применяем их
    if (Object.keys(filtersFromUrl).length > 0) {
      setFilters(filtersFromUrl);
      const query = searchParams.toString();
      fetchData(`https://rickandmortyapi.com/api/character/?${query}`);
    } else {
      fetchData('https://rickandmortyapi.com/api/character/');
    }
  }, [fetchData]);

  const handleReset = async () => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });
    setActivePage(0);
    window.history.replaceState(null, '', window.location.pathname);
    await fetchData('https://rickandmortyapi.com/api/character/'); //без фильтров
  };

  const statusOptions = [...new Set(characters.map((c) => c.status))].map(
    (status) => ({
      value: status,
      text: status
    })
  );

  const genderOptions = [...new Set(characters.map((c) => c.gender))].map(
    (gender) => ({
      value: gender,
      text: gender
    })
  );

  const nameOptions = [...new Set(characters.map((c) => c.species))].map(
    (species) => ({
      value: species,
      text: species
    })
  );

  return (
    <StyledFilter>
      <Dropdown
        idDropdown="status-filter"
        placeholder="Status"
        value={filters.status}
        optionsData={statusOptions}
        onChange={(value) => handleFilterChange('status', value)}
      />
      <Dropdown
        idDropdown="gender-filter"
        placeholder="Gender"
        value={filters.gender}
        optionsData={genderOptions}
        onChange={(value) => handleFilterChange('gender', value)}
      />
      <Dropdown
        idDropdown="species-filter"
        placeholder="Species"
        value={filters.species}
        optionsData={nameOptions}
        onChange={(value) => handleFilterChange('species', value)}
      />
      <Input
        placeholder="Name"
        name="nameCharacter"
        value={filters.name}
        onChange={(e) => handleFilterChange('name', e.target.value)}
      />
      <Input
        placeholder="Type"
        name="typeChharacter"
        value={filters.type}
        onChange={(e) => handleFilterChange('type', e.target.value)}
      />
      <StyledButtons>
        <Button variant="green" onClick={handleApply}>
          Apply
        </Button>
        <Button variant="red" onClick={handleReset}>
          Reset
        </Button>
      </StyledButtons>
    </StyledFilter>
  );
}

const StyledFilter = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 530px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 530px) {
    display: flex;
    flex-direction: column;
  }
`;
