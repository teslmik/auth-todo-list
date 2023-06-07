/* eslint-disable no-confusing-arrow */
import React from 'react';
import { Box, Paper, Table, TableContainer, TablePagination } from '@mui/material';
import { ITodo } from '../../types';
import { Order } from '../../enums';
import { TableHeader } from './table-header.component';
import { TodoTableRows } from './todo-table-rows.component';

export const TodoTable: React.FC = () => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [order, setOrder] = React.useState<Order>(Order.ASC);
  const [orderBy, setOrderBy] = React.useState<keyof Omit<ITodo, 'complited'>>('title');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Omit<ITodo, 'complited'>
  ) => {
    const isAsc = orderBy === property && order === Order.ASC;
    setOrder(isAsc ? Order.DESC : Order.ASC);
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const todosData = await response.json();
        setTodos(todosData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    getTodos();
  }, []);

  if (todos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: '100%', pt: 3 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TodoTableRows
              order={order}
              orderBy={orderBy}
              rowsPerPage={rowsPerPage}
              page={page}
              rows={todos}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={todos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
