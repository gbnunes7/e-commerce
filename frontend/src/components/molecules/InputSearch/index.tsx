'use client';
import Button from '@/components/atoms/Button';
import { InputSearchProps } from '@/interface/inputsearch';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

const InputSearch: React.FC<InputSearchProps> = ({
  placeholder = 'What are you looking for?',
}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSearch = (query: string) => {
    console.log(query);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="pr-3 pl-5 py-2 rounded-[4px] bg-[#F5F5F5] placeholder:text-[12px] min-h-[40px] focus:outline-none"
      />
      <Button onClick={handleSearch} className="relative top-[5px] right-8">
        <CiSearch className="text-xl " />
      </Button>
    </div>
  );
};

export default InputSearch;
