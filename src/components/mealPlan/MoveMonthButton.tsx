import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC } from "react";

type Props = {
  href: string;
  icon: IconDefinition;
};

export const MoveMonthButton: FC<Props> = ({ href, icon }) => (
  <Link className="btn btn-circle btn-outline" href={href}>
    <FontAwesomeIcon icon={icon} className="h-6 w-6" />
  </Link>
);
