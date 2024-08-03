import type { User } from "next-auth";
import Image from "next/image";
import type { FC } from "react";
import { NameProfileImage } from "./NameProfileImage";

export type UserLike = Pick<User, "name" | "image">;

type Props = {
  user: UserLike;
  size: number;
};

export const ProfileImage: FC<Props> = ({ user, size }) => {
  if (user.image == null) return <NameProfileImage name={user.name ?? "??"} />;

  return (
    <div className="avatar">
      <Image
        src={user.image}
        alt={user.name ?? "??"}
        width={size}
        height={size}
        className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
      />
    </div>
  );
};
