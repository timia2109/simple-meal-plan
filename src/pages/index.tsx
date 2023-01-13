import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Card } from "../components/common/Card";
import { Footer } from "../components/common/Footer";
import { SignInButtons } from "../components/index/SignInButtons";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

const Home: NextPage = () => {
  const { t: tCommon } = useTranslation("common");
  const { t } = useTranslation("index");

  return (
    <>
      <Head>
        <title>{tCommon("title")}</title>
      </Head>
      <main className="min-h-screen bg-blue-300">
        <div className="container flex flex-col items-center gap-5 px-4 py-3">
          <h1 className="mb-3 text-5xl font-extrabold">{tCommon("title")}</h1>
          <Card>
            <p>{t("about")}</p>
            <p>{t("info")}</p>
          </Card>

          <SignInButtons />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<any> = async ({
  locale,
  req,
  res,
}) => {
  const translationsPromise = serverSideTranslations(locale ?? "en", [
    "common",
    "index",
  ]);
  const session = await getServerAuthSession({ req, res });

  if (session !== null) {
    return {
      redirect: {
        destination: "/mealPlan",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await translationsPromise),
    },
  };
};
