import { ButtonGroup, Button } from '@mui/material';
import React from 'react';
import { COLORS } from '../../../theme';
import { buttonGroupData } from '../../consts';
import { ButtonType } from '../../types';

export const TodoButtonGroup: React.FC = () => {
  const [buttonLabel, setButtonLabel] = React.useState<ButtonType>('all');

  const handleActive = (value: ButtonType) => {
    setButtonLabel(value);
  };

  const handleClick = (buttonValue: ButtonType) => () => handleActive(buttonValue);

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {buttonGroupData.map((button) => (
        <Button
          key={button.value}
          size="small"
          sx={
            buttonLabel === button.value
              ? { backgroundColor: COLORS.buttonActive }
              : { backgroundColor: COLORS.button }
          }
          onClick={handleClick(button.value)}
        >
          {button.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
