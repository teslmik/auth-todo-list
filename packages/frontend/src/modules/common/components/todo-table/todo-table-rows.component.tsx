import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { Order } from '../../enums';
import { ITodo } from '../../types';
import { getComparator } from '../../utils';
import { TableActionsCell } from './table-actions-cell.component';

interface Props {
  order: Order;
  orderBy: keyof Omit<ITodo, 'complited'>;
  rowsPerPage: number;
  page: number;
  rows: ITodo[];
}

export const TodoTableRows: React.FC<Props> = ({ order, orderBy, rowsPerPage, page, rows }) => {
  const stableSort = <T,>(
    array: readonly Omit<T, 'complited'>[],
    comparator: (a: T, b: T) => number
  ) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const orderSort = comparator(a[0], b[0]);
      if (orderSort !== 0) {
        return orderSort;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const newTodos = rows.map((row) => {
    const { complited, ...rest } = row;
    return rest;
  });

  const visibleRows = React.useMemo(
    () =>
      stableSort(newTodos, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <TableBody>
      {visibleRows.map((row, index) => (
        <TableRow hover tabIndex={-1} key={row.title}>
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell align="right">
            <TableActionsCell row={rows[index]} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
