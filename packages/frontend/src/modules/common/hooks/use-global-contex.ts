import { createContext, useContext } from 'react';

export type GlobalContent = {
  isOpen: { open: boolean; edit?: boolean };
  setIsOpen: React.Dispatch<React.SetStateAction<{ open: boolean; edit?: boolean }>>;
  isRecovery: boolean;
  setIsRecovery: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MyGlobalContext = createContext<GlobalContent>({
  isOpen: { open: false, edit: true },
  setIsOpen: () => {},
  isRecovery: false,
  setIsRecovery: () => {}
});

export const useGlobalContext = () => useContext(MyGlobalContext);
