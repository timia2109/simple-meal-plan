import classNames from "classnames";
import type { User } from "next-auth";
import Image from "next/image";
import type { FC } from "react";
import { NameProfileImage } from "./NameProfileImage";

export type UserLike = Pick<User, "name" | "image">;

type Props = {
  user: UserLike;
  withRing?: boolean;
};

export const ProfileImage: FC<Props> = ({ user, withRing }) => {
  if (user.image == null) return <NameProfileImage name={user.name ?? "??"} />;

  return (
    <div className="avatar">
      <Image
        src={user.image}
        alt={user.name ?? "??"}
        title={user.name ?? "??"}
        width={40}
        height={40}
        className={classNames({
          "min-w-10 max-w-10 rounded-full ring-offset-base-100": true,
          "ring ring-primary ring-offset-2": withRing,
        })}
      />
    </div>
  );
};
