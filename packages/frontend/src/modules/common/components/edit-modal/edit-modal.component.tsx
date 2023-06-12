import {
  Box,
  Button,
  Fade,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useCreateTodos, useEditTodo } from '../../hooks';
import { ITodoCreate, ITodo } from '../../types';
import { editModalStyled } from './edit-modal.styled';

interface Props {
  isOpen: { open: boolean; edit?: boolean };
  setIsOpen: React.Dispatch<React.SetStateAction<{ open: boolean; edit?: boolean }>>;
  todo?: ITodo | null;
}

export const EditModal: React.FC<Props> = ({ isOpen, setIsOpen, todo }) => {
  const [isPrivate, setIsPrivate] = React.useState(todo?.private ?? false);
  const { mutate: create } = useCreateTodos();
  const { mutate: editTodo } = useEditTodo();

  const handleOnSudmit = (data: ITodoCreate) => {
    data.private = isPrivate;
    if (isOpen.edit && todo) {
      editTodo({ id: todo.id, completed: todo.completed, ...data });
    } else {
      create(data);
    }
    setIsOpen({ open: false });
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      description: '',
      private: false
    },
    onSubmit: handleOnSudmit
  });

  const handleOnClose = () => setIsOpen((prev) => ({ open: false, edit: prev.edit }));
  const handleSwitchOnChange = () => setIsPrivate(!isPrivate);

  React.useEffect(() => {
    if (isOpen.edit && todo) {
      setFieldValue('title', todo.title);
      setFieldValue('description', todo.description);
      setFieldValue('private', todo.private);
    } else {
      setFieldValue('title', '');
      setFieldValue('description', '');
      setFieldValue('private', isPrivate);
    }
  }, [isOpen, todo]);

  return (
    <Modal
      open={isOpen.open}
      onClose={handleOnClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ p: 4 }}
    >
      <Fade in={isOpen.open}>
        <Box sx={editModalStyled} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isOpen.edit ? 'Edit Todo' : 'Create todo'}
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
            <FormControlLabel
              name="private"
              labelPlacement="start"
              control={<Switch checked={isPrivate} onChange={handleSwitchOnChange} />}
              label="Private"
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
