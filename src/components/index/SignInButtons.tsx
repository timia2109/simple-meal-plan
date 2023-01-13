import { useQuery } from "@tanstack/react-query";
import { getProviders, signIn, type ClientSafeProvider } from "next-auth/react";
import { useTranslation } from "next-i18next";

const SignInProvider: React.FC<Partial<ClientSafeProvider>> = ({
  name,
  id,
}) => {
  const { t } = useTranslation("index");

  return (
    <button
      onClick={id === undefined ? undefined : () => signIn(id)}
      className="rounded border border-blue-400 bg-blue-500 p-2 text-white
      transition-all hover:scale-110 hover:bg-blue-900 hover:text-white
      "
    >
      {id && t("signInWith", { name })}
    </button>
  );
};

export const SignInButtons: React.FC = () => {
  const { data, isLoading } = useQuery(["auth", "providers"], getProviders, {
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {Object.values(data!).map((d) => (
        <SignInProvider key={d.id} {...d} />
      ))}
    </div>
  );
};
