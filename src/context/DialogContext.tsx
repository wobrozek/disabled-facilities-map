import { createContext } from 'react';

type DialogContextType = {
  id: string;
  name: string;
  location: string;
};

const DialogContext = createContext<DialogContextType[]>([]);

export default DialogContext;
