import { Box, Button, Switch } from '@mui/material';
import React from 'react';
import { ITodo } from '../../types';

interface Props {
  row: ITodo;
}

export const TableActionsCell: React.FC<Props> = ({ row }) => (
  <Box component="div" sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
    <Button variant="contained">View</Button>
    <Button variant="contained">Delete</Button>
    <Switch checked={row.complited} />
  </Box>
);
