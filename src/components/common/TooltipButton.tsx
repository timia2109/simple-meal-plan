import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  title: string;
};

export const TooltipButton: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  ...props
}) => {
  return (
    <div className="tooltip" data-tip={title}>
      <button {...props}>{children}</button>
    </div>
  );
};
