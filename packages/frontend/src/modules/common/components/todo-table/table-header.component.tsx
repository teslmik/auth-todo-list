import React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { Order } from '../../enums';
import { ITodo } from '../../types';
import { headCells } from '../../consts';

interface Props {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Omit<ITodo, 'complited'>
  ) => void;
  order: Order;
  orderBy: string;
}

export const TableHeader: React.FC<Props> = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler =
    (property: keyof Omit<ITodo, 'complited'>) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            sx={index === 1 ? { width: '66%' } : { width: 'auto' }}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : Order.ASC}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                variant="body1"
                component="span"
                sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
              >
                {headCell.label}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell sx={{ width: 'auto' }} align="center">
          <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
            Actions
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
