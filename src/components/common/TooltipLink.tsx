import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

type Props = Parameters<typeof Link>[0] & {
  title: string;
};

export const TooltipLink: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  ...props
}) => {
  return (
    <div className="tooltip" data-tip={title}>
      <Link {...props}>{children}</Link>
    </div>
  );
};
