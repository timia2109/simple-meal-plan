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
    <div className="avatar placeholder" title={name}>
      <div className="w-10 rounded-full bg-neutral text-neutral-content">
        <span>{initials}</span>
      </div>
    </div>
  );
};
