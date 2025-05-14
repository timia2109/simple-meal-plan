import type { FC } from "react";

type Props = {
  name: string;
};

const initialsRegex = /(\w).+ (\w)/;

export const NameProfileImage: FC<Props> = ({ name }) => {
  const regexResult = name.match(initialsRegex);
  const initials =
    regexResult != null ? regexResult[1] + regexResult[2] : name[0] + name[1];

  return (
    <div className="avatar avatar-placeholder" title={name}>
      <div className="bg-neutral text-neutral-content w-10 rounded-full">
        <span>{initials}</span>
      </div>
    </div>
  );
};
