import { Box, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useCreateTodos, useEditTodo } from '../../hooks';
import { ITodo } from '../../types';
import { editModalStyled } from './edit-modal.styled';

interface Props {
  isOpen: { open: boolean; edit?: boolean };
  setIsOpen: React.Dispatch<React.SetStateAction<{ open: boolean; edit?: boolean }>>;
  todo?: ITodo | null;
}

export const EditModal: React.FC<Props> = ({ isOpen, setIsOpen, todo }) => {
  const { mutate: create } = useCreateTodos();
  const { mutate: editTodo } = useEditTodo();

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    onSubmit: (data) => {
      if (isOpen.edit && todo) {
        editTodo({ id: todo.id, complited: todo.complited, ...data });
      } else {
        create(data);
      }
      setIsOpen({ open: false });
    }
  });

  React.useEffect(() => {
    if (isOpen.edit && todo) {
      setFieldValue('title', todo.title);
      setFieldValue('description', todo.description);
    } else {
      setFieldValue('title', '');
      setFieldValue('description', '');
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen.open}
      onClose={() => setIsOpen((prev) => ({ open: false, edit: prev.edit }))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={isOpen.open}>
        <Box sx={editModalStyled} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isOpen.edit ? 'Edit Todo' : 'Create todo'}
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              required
              id="outlined-required"
              name="title"
              label="Todo title"
              type="text"
              onChange={handleChange}
              value={values.title}
              margin="normal"
            />
            <TextField
              required
              id="outlined-disabled"
              name="description"
              label="Todo description"
              type="text"
              onChange={handleChange}
              value={values.description}
              multiline
              margin="normal"
              rows={5}
            />
            <Button variant="contained" type="submit">
              {isOpen.edit ? 'Edit todo' : 'Create todo'}
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
