import React from 'react';
import { TodoTable } from '../common/components/todo-table';

// const todos = [
//   {
//     id: 1,
//     title: 'Todo 1',
//     description: 'Description 1',
//     completed: false,
//   },
//   {
//     id: 2,
//     title: 'Todo 2',
//     description: 'Description 2',
//     completed: true
//   }
// ];

const HomePageContainer: React.FC = () => (
  //   const handleViewClick = (id: number) => {
  //     console.log(`View clicked for todo with ID: ${id}`);
  //     // Дополнительная логика обработки нажатия кнопки "View"
  //   };

  //   const handleDeleteClick = (id: number) => {
  //     console.log(`Delete clicked for todo with ID: ${id}`);
  //     // Дополнительная логика обработки нажатия кнопки "Delete"
  //   };

  //   const handleToggleComplete = (id: number, completed: boolean) => {
  //     console.log(`Toggle complete for todo with ID: ${id}, completed: ${completed}`);
  //     // Дополнительная логика обработки изменения переключателя
  //   };

  <div>
    <TodoTable />
  </div>
);

export default HomePageContainer;
