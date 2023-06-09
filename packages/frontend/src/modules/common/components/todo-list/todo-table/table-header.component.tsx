import React from 'react';
import styled from 'styled-components';
import { TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { headCells } from '../../../consts';
import { WEIGHTS } from '../../../../theme/fonts.const';

const StyledTableCell = styled(({ cellIndex, ...rest }) => <TableCell {...rest} />).attrs(
  (props) => ({
    width: props.cellIndex === 1 ? '67%' : 'auto',
    restwidth: props.cellIndex === 1 ? '44%' : 'auto'
  })
)`
  width: ${(props) => props.width};

  @media (max-width: 800px) {
    width: ${(props) => props.restwidth};
  }
`;

export const TableHeader: React.FC = () => (
  <TableHead>
    <TableRow>
      {headCells.map((headCell, index) => (
        <StyledTableCell key={headCell.id} cellIndex={index} align="left">
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
          >
            {headCell.label}
          </Typography>
        </StyledTableCell>
      ))}
      <TableCell sx={{ width: 'auto' }} align="center">
        <Typography variant="body1" component="span" sx={{ fontWeight: WEIGHTS.bold }}>
          Actions
        </Typography>
      </TableCell>
    </TableRow>
  </TableHead>
);
