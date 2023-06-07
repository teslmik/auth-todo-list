import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { ITodo } from '../../types';
import { TableActionsCell } from './table-actions-cell.component';

interface Props {
  handleOpen: (id: string) => void;
  rows: ITodo[];
}

export const TodoTableRows: React.FC<Props> = ({ handleOpen, rows }) => (
  <TableBody>
    {rows.map((row) => (
      <TableRow hover key={row.title}>
        <TableCell component="th">{row.title}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell align="right">
          <TableActionsCell row={row} handleOpen={handleOpen} />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);
