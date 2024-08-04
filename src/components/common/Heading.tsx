import type { FC, PropsWithChildren } from "react";

export const Heading: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <h1 className="mb-2 text-2xl font-bold">{children}</h1>
);
