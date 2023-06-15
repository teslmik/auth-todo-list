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
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { APP_KEYS } from '../../consts';
import { useCreateTodos, useEditTodo } from '../../hooks';
import { ITodoCreate, ITodo, IUser } from '../../types';
import { todoValidate } from '../../validation';
import { editModalStyled, StyledTextFields } from './edit-modal.styled';

interface Props {
  isOpen: { open: boolean; edit?: boolean };
  setIsOpen: React.Dispatch<React.SetStateAction<{ open: boolean; edit?: boolean }>>;
  todo?: (ITodo & { userId: string }) | null;
}

export const EditModal: React.FC<Props> = ({ isOpen, setIsOpen, todo }) => {
  const [isPrivate, setIsPrivate] = React.useState(todo?.private ?? false);

  const { mutate: create } = useCreateTodos();
  const { mutate: editTodo } = useEditTodo();

  const client = useQueryClient();
  const authUser: IUser | undefined = client.getQueryData([APP_KEYS.QUERY_KEYS.USER]);
  const isDisabled = todo?.userId === authUser?.id;

  const handleOnSudmit = (data: ITodoCreate) => {
    data.private = isPrivate;
    if (isOpen.edit && todo) {
      editTodo({ id: todo.id, completed: todo.completed, ...data });
    } else {
      create(data);
    }
    setIsPrivate(false);
    setIsOpen({ open: false });
  };

  const { values, handleChange, handleSubmit, setFieldValue, resetForm, errors, submitCount } =
    useFormik({
      initialValues: {
        title: '',
        description: '',
        private: false
      },
      onSubmit: handleOnSudmit,
      validate: todoValidate,
      validateOnBlur: false,
      validateOnChange: false
    });

  const handleOnClose = () => {
    setIsOpen((prev) => ({ open: false, edit: prev.edit }));
    setIsPrivate(false);
    resetForm();
  };
  const handleSwitchOnChange = () => setIsPrivate(!isPrivate);

  React.useEffect(() => {
    setIsPrivate(isOpen.edit ? todo?.private ?? false : false);
    setFieldValue('title', isOpen.edit && todo ? todo.title : '');
    setFieldValue('description', isOpen.edit && todo ? todo.description : '');
    setFieldValue('private', isOpen.edit ? todo?.private ?? false : isPrivate);
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
          <StyledTextFields>
            <TextField
              error={submitCount > 0 && !!errors.title}
              helperText={(submitCount > 0 && errors.title) || ''}
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
              error={submitCount > 0 && !!errors.description}
              helperText={(submitCount > 0 && errors.description) || ''}
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
              control={
                <Switch
                  checked={isPrivate}
                  onChange={handleSwitchOnChange}
                  disabled={isOpen.edit ? !isDisabled : false}
                />
              }
              label="Private"
            />
            <Button variant="contained" type="submit">
              {isOpen.edit ? 'Edit todo' : 'Create todo'}
            </Button>
          </StyledTextFields>
        </Box>
      </Fade>
    </Modal>
  );
};
