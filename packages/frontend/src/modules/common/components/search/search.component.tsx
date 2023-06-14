import { TextField } from '@mui/material';
import React from 'react';

interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoSearch: React.FC<Props> = ({ search, setSearch }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return (
    <TextField
      label="Search todos"
      type="search"
      fullWidth
      value={search}
      onChange={handleOnChange}
    />
  );
};
