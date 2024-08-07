"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC, PropsWithChildren } from "react";

type Props = {
  href: string;
};

/** A (Route)Link that knows if it's active
 */
export const ActiveLink: FC<PropsWithChildren<Props>> = ({
  href,
  children,
}) => {
  const pathName = usePathname();

  return (
    <Link href={href} className={pathName === href ? "active" : ""}>
      {children}
    </Link>
  );
};
