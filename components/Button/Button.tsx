import React, { ReactNode } from "react";
import { createComponent } from "@lit/react";
import { THWButton } from "@malte2036/thw-tools-components";

const THWButtonComponent = createComponent({
  elementClass: THWButton as any,
  react: React,
  tagName: "thw-button",
  displayName: "THWButton",
});

type ButtonProps = {
  children: ReactNode;
  type: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button(props: ButtonProps) {
  const buttonProps = {
    type: props.type ?? "primary",
    disabled: props.disabled ?? false,
    size: props.size ?? "medium",
    onClick: props.onClick,
  };

  return (
    <THWButtonComponent {...buttonProps} className={props.className}>
      {props.children}
    </THWButtonComponent>
  );
}
