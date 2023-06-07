import React from 'react';
import { TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { headCells } from '../../consts';

export const TableHeader: React.FC = () => (
  <TableHead>
    <TableRow>
      {headCells.map((headCell, index) => (
        <TableCell
          key={headCell.id}
          sx={index === 1 ? { width: '66%' } : { width: 'auto' }}
          align="left"
        >
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
          >
            {headCell.label}
          </Typography>
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
