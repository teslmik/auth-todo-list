/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Box, Button } from '@mui/material';
import { EffectCoverflow } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useInView } from 'react-intersection-observer';
import { TodoItem } from '../todo-item.component';
import { IAllTodosData } from '../../../types';
import { StyledSwiper } from './todo-slider.styled';

import 'swiper/swiper.min.css';

interface Props {
  data: InfiniteData<IAllTodosData>;
  handleOpen: (id: string) => void;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<IAllTodosData, AxiosResponse<any>>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const TodoSlider: React.FC<Props> = ({
  data,
  handleOpen,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}) => {
  const { ref, inView } = useInView();

  const handleFetchNeaxtPage = () => fetchNextPage();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
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
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((todo) => (
            <SwiperSlide key={todo.id}>
              <Box sx={{ width: 320, minHeight: 300 }}>
                <TodoItem todo={todo} handleOpen={handleOpen} />
              </Box>
            </SwiperSlide>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <SwiperSlide>
          <Box
            sx={{
              width: 320,
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              ref={ref}
              disabled={!hasNextPage || isFetchingNextPage}
              onClick={handleFetchNeaxtPage}
            >
              {isFetchingNextPage && 'Loading more...'}
            </Button>
          </Box>
        </SwiperSlide>
      )}
    </StyledSwiper>
  );
};
