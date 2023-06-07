import React from 'react';
import { Box, Paper, Table, TableContainer, TablePagination } from '@mui/material';
import { ITodo } from '../../types';
import { TableHeader } from './table-header.component';
import { TodoTableRows } from './todo-table-rows.component';
import { EditModal } from '../edit-modal';
import { useGetAllTodos, useGlobalContext } from '../../hooks';
import { Loader } from '../loader';

export const TodoTable: React.FC = () => {
  const { data: todos, isSuccess, isLoading } = useGetAllTodos();
  const { isOpen, setIsOpen } = useGlobalContext();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentTodo, setCurrentTodo] = React.useState<ITodo | null>(null);

  const handleOpen = (id: string) => {
    const findTodo = todos?.filter((todo) => todo.id === id)[0];
    if (findTodo) {
      setCurrentTodo(findTodo);
    }
    setIsOpen({ open: true, edit: true });
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  return (
    <>
      <Box sx={{ width: '100%', pt: 3 }}>
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
      </Box>
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} todo={currentTodo} />
    </>
  );
};
