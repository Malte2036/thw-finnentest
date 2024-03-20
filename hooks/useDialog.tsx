import { ReactNode, createContext, useContext } from "react";

type DialogContextType = {
  setDialog: React.Dispatch<React.SetStateAction<ReactNode>>;
  closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

export function useDialogContext() {
  return useContext(DialogContext);
}
