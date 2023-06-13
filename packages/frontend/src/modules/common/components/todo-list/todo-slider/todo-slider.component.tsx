import React from 'react';
import { Box } from '@mui/material';
import { EffectCoverflow } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { IAllTodosData } from '../../../types';
import { TodoItem } from '../todo-item.component';

import 'swiper/swiper.min.css';
import { StyledSwiper } from './todo-slider.styled';

interface Props {
  todos: IAllTodosData;
  handleOpen: (id: string) => void;
  // page: number;
  // setPage: React.Dispatch<React.SetStateAction<number>>;
  // pageSize: number;
  // setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoSlider: React.FC<Props> = ({
  todos,
  handleOpen
  // page,
  // setPage,
  // pageSize,
  // setPageSize
}) => (
  <StyledSwiper
    className="todo-slider"
    modules={[EffectCoverflow]}
    effect="coverflow"
    grabCursor
    centeredSlides
    slidesPerView="auto"
    coverflowEffect={{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }}
  >
    {todos.data.map((todo) => (
      <SwiperSlide key={todo.id}>
        <Box sx={{ width: 320, minHeight: 300 }}>
          <TodoItem todo={todo} handleOpen={handleOpen} />
        </Box>
      </SwiperSlide>
    ))}
  </StyledSwiper>
);
