import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { ITodo } from '../../../types';
import { TableActionsCell } from '../table-actions.component';

interface Props {
  handleOpen: (id: string) => void;
  rows: ITodo[];
}

export const TodoTableRows: React.FC<Props> = ({ handleOpen, rows }) => (
  <TableBody>
    {rows.map((row) => (
      <TableRow hover key={row.title}>
        <TableCell>{row.title}</TableCell>
        <TableCell sx={{ wordWrap: ' break-word' }}>{row.description}</TableCell>
        <TableCell align="right">
          <TableActionsCell row={row} handleOpen={handleOpen} />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);
