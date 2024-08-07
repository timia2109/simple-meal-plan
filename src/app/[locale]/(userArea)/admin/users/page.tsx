import PagingComponent from "@/components/common/PagingComponent";
import { ProfileImage } from "@/components/common/ProfileImage";
import { getUsers } from "@/dal/admin/getUsers";
import { getCurrentLocale, getScopedI18n } from "@/locales/server";
import type { User } from "@prisma/client";

const pageSize = 50;

type Props = {
  searchParams: {
    query: string | undefined;
    skip: string | undefined;
  };
};

async function UserComponent({ user }: { user: User }) {
  const t = await getScopedI18n("admin");
  const locale = getCurrentLocale();

  return (
    <div
      className="border-e border-s border-t border-accent p-3 
      first:rounded-t last:rounded-b last:border-b"
    >
      <div className="flex items-center justify-start gap-3">
        <ProfileImage user={user} />
        <p>{user.name}</p>
      </div>
      <div>
        <p>
          {t("userEmail")}: {user.email}
        </p>
        <p>
          {t("userCreatedAt")}: {user.createdAt.toLocaleString(locale)}
        </p>
      </div>
    </div>
  );
}

export default async function UsersPage({ searchParams }: Props) {
  const t = await getScopedI18n("admin");
  const skip = searchParams.skip ? parseInt(searchParams.skip) : 0;
  const { data: users, total } = await getUsers(
    searchParams.query,
    skip,
    pageSize
  );

  return (
    <div>
      <div className="mb-3">
        <form method="get">
          <div className="join w-full">
            <input
              className="input join-item input-bordered w-full"
              name="query"
              defaultValue={searchParams.query}
              placeholder={t("usersQuery")}
            />
            <button type="submit" className="btn join-item rounded-r-full">
              {t("usersSearch")}
            </button>
          </div>
        </form>
      </div>

      <div>
        {users.map((user) => (
          <UserComponent key={user.id} user={user} />
        ))}
      </div>

      <PagingComponent total={total} pageSize={pageSize} skip={skip} />
    </div>
  );
}
