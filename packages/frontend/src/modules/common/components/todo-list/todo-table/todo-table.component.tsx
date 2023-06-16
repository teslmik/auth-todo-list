import React from 'react';
import { Paper, Table, TableContainer, TablePagination } from '@mui/material';
import { TableHeader } from './table-header.component';
import { TodoTableRows } from './todo-table-rows.component';
import { IAllTodosData } from '../../../types';
import { StylesBox } from './todo-table.styled';

interface Props {
  todos: IAllTodosData;
  handleOpen: (id: string) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoTable: React.FC<Props> = ({
  todos,
  handleOpen,
  page,
  setPage,
  pageSize,
  setPageSize
}) => {
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <StylesBox>
      <Paper className="paper">
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <TableHeader />
            <TodoTableRows handleOpen={handleOpen} rows={todos.data} />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={todos.totalCount}
          rowsPerPage={pageSize}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </StylesBox>
  );
};
