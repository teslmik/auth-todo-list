import { createContext, useContext } from 'react';

export type GlobalContent = {
  isOpen: { open: boolean; edit?: boolean };
  setIsOpen: React.Dispatch<React.SetStateAction<{ open: boolean; edit?: boolean }>>;
};

export const MyGlobalContext = createContext<GlobalContent>({
  isOpen: { open: false, edit: true },
  setIsOpen: () => {}
});

export const useGlobalContext = () => useContext(MyGlobalContext);
