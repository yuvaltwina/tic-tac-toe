import React, { forwardRef, Ref } from 'react';
import './MainButton.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function MainButton(
  { className, children, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button className="main-button" ref={ref} type="button" {...props}>
      {children}
    </button>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(MainButton);
