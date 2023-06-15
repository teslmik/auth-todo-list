import { ButtonGroup, Button } from '@mui/material';
import React from 'react';
import { COLORS } from '../../../theme';
import { buttonGroupData } from '../../consts';
import { ButtonType } from '../../enums';

interface Props {
  buttonLabel: ButtonType;
  setButtonLabel: React.Dispatch<React.SetStateAction<ButtonType>>;
}

export const TodoButtonGroup: React.FC<Props> = ({ buttonLabel, setButtonLabel }) => {
  const handleClick = (buttonValue: ButtonType) => () => setButtonLabel(buttonValue);

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
