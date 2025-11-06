import styled from 'styled-components';
import { useData } from '../providers/DataProvider';
import { Dropdown } from './Dropdown';
import { Input } from './Input';
import { Button } from './Button';
import { useCallback, useEffect, useState } from 'react';
import { buildQueryString } from '../utils';
import { useAllCharacters } from '../hooks/useAllCharacters';

export function DropdownFilter() {
  const { fetchData, setActivePage, setApiURL } = useData();
  const { allCharacters } = useAllCharacters();
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  const handleFilterChange = useCallback(
    (key, value) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [setFilters]
  );

  const handleDropdownChange = useCallback(
    (key) => (value) => {
      handleFilterChange(key, value);
    },
    [handleFilterChange]
  );

  const handleInputChange = useCallback(
    (key) => (e) => {
      handleFilterChange(key, e.target.value);
    },
    [handleFilterChange]
  );

  const handleApply = useCallback(() => {
    const query = buildQueryString(filters);
    const url = `https://rickandmortyapi.com/api/character/?${query}`;
    setApiURL(url);
    setActivePage(0);
    window.history.replaceState(null, '', `?${query}`);
  }, [setApiURL, setActivePage, filters]);

  const handleReset = useCallback(() => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });

    setActivePage(0);
    setApiURL('https://rickandmortyapi.com/api/character/');
    window.history.replaceState(null, '', window.location.pathname);
  }, [setFilters, setActivePage, setApiURL]);

  const statusOptions = [...new Set(allCharacters.map((c) => c.status))].map(
    (status) => ({
      value: status,
      text: status
    })
  );
  const genderOptions = [...new Set(allCharacters.map((c) => c.gender))].map(
    (gender) => ({
      value: gender,
      text: gender
    })
  );
  const nameOptions = [...new Set(allCharacters.map((c) => c.species))].map(
    (species) => ({
      value: species,
      text: species
    })
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const filtersFromUrl = Object.fromEntries(searchParams.entries());

    if (Object.keys(filtersFromUrl).length > 0) {
      setFilters((prev) => ({ ...prev, ...filtersFromUrl }));
      const query = buildQueryString(filtersFromUrl);
      fetchData(`https://rickandmortyapi.com/api/character/?${query}`);
    }
  }, [fetchData]);

  return (
    <StyledFilter>
      <Dropdown
        idDropdown="status-filter"
        placeholder="Status"
        value={filters.status}
        optionsData={statusOptions}
        onChange={handleDropdownChange('status')}
      />
      <Dropdown
        idDropdown="gender-filter"
        placeholder="Gender"
        value={filters.gender}
        optionsData={genderOptions}
        onChange={handleDropdownChange('gender')}
      />
      <Dropdown
        idDropdown="species-filter"
        placeholder="Species"
        value={filters.species}
        optionsData={nameOptions}
        onChange={handleDropdownChange('species')}
      />
      <Input
        placeholder="Name"
        name="nameCharacter"
        value={filters.name}
        onChange={handleInputChange('name')}
      />
      <Input
        placeholder="Type"
        name="typeCharacter"
        value={filters.type}
        onChange={handleInputChange('type')}
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
