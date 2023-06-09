import React from 'react';
import { Paper, Table, TableContainer, TablePagination } from '@mui/material';
import { TableHeader } from './table-header.component';
import { TodoTableRows } from './todo-table-rows.component';
import { ITodo } from '../../../types';
import { StylesBox } from './todo-table.styled';

interface Props {
  todos: ITodo[];
  handleOpen: (id: string) => void;
}

export const TodoTable: React.FC<Props> = ({ todos, handleOpen }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <StylesBox>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHeader />
            <TodoTableRows handleOpen={handleOpen} rows={todos} />
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
    </StylesBox>
  );
};
