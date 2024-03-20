import { ReactNode, useState } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { DialogContext } from "hooks/useDialog";

function MyApp({ Component, pageProps }: AppProps) {
  const [dialog, setDialog] = useState<ReactNode | undefined>();

  return (
    <DialogContext.Provider
      value={{
        setDialog,
        closeDialog: () => setDialog(undefined),
      }}
    >
      <Component {...pageProps} />
      {dialog}
    </DialogContext.Provider>
  );
}

export default MyApp;
