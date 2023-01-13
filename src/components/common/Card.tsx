import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{ title?: string }>;

export const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="max-w-lg rounded-lg border border-gray-400 bg-gray-300 p-3 shadow-md">
    {title && <h2>{title}</h2>}
    <div className="space flex flex-col gap-3 align-middle">{children}</div>
  </div>
);
