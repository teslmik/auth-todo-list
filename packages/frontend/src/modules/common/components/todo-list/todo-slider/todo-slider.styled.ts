import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const StyledSwiper = styled(Swiper)`
  display: none;
  visibility: hidden;
  opacity: 0;
  border: 1 px solid green;
  margin-top: 32px;
  width: 320px;
  left: 0;
  @media ${({ theme }) => theme.BREAKPOINTS.tablet} {
    display: block;
    visibility: visible;
    opacity: 1;
  }
`;
