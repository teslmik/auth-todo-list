import React from 'react';
import { Box } from '@mui/material';
import { EffectCoverflow } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { ITodo } from '../../../types';
import { TodoItem } from '../todo-item.component';

import 'swiper/swiper.min.css';
import { StyledSwiper } from './todo-slider.styled';

interface Props {
  todos: ITodo[];
  handleOpen: (id: string) => void;
}

export const TodoSlider: React.FC<Props> = ({ todos, handleOpen }) => (
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
    {todos.map((todo) => (
      <SwiperSlide key={todo.id}>
        <Box sx={{ width: 320, minHeight: 300 }}>
          <TodoItem todo={todo} handleOpen={handleOpen} />
        </Box>
      </SwiperSlide>
    ))}
  </StyledSwiper>
);
