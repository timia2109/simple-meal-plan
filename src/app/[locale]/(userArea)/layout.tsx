import { NavBar } from "@/components/common/NavBar";
import type { LayoutProps } from "../../../../.next/types/app/layout";

export default function UserLayout({ children }: LayoutProps) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
