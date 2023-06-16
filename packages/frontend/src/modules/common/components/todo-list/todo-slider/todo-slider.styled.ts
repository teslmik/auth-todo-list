import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const StyledSwiper = styled(Swiper)`
  display: block;
  border: 1 px solid green;
  margin-top: 32px;
  width: 320px;
  left: 0;

  .swiper-slide-box {
    width: 320px;
    min-height: 300px;
  }

  .load-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
