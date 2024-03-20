import { createComponent } from "@lit/react";
import { THWDialog } from "@malte2036/thw-tools-components";
import { useDialogContext } from "hooks/useDialog";
import React, { ReactNode } from "react";

const THWDialogComponent = createComponent({
  elementClass: THWDialog as any,
  react: React,
  tagName: "thw-dialog",
  displayName: "THWDialog",
});

type DialogProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function Dialog({ title, children, footer }: DialogProps) {
  const dialogContext = useDialogContext();

  const dialogProps = {
    title,
    onOutsideClick: dialogContext?.closeDialog,
  };

  return (
    <THWDialogComponent {...dialogProps}>
      <slot slot="content">{children}</slot>
      {footer && <slot slot="footer">{footer}</slot>}
    </THWDialogComponent>
  );
}
