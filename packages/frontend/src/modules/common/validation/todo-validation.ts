type TodoErrors = {
  title?: string;
  description?: string;
};

export const todoValidate = (values: { title: string; description: string }) => {
  const errors: TodoErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Todo title is required';
  }

  if (!values.description.trim()) {
    errors.description = 'Todo description is required';
  }

  return errors;
};
