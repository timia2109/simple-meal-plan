import type { MealPlan, PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";
import type { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Footer } from "../../components/common/Footer";
import { Calendar } from "../../components/index/Calendar";
import { getMealPlan } from "../../dal/mealPlans/getMealPlan";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

type Props = {
  startDate: string;
  mealPlan: MealPlan;
};

const Home: NextPage<Props> = ({ mealPlan, startDate }) => {
  const { t: tCommon } = useTranslation("common");
  const { t } = useTranslation("mealPlan");

  return (
    <>
      <Head>
        <title>{tCommon("title")}</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-blue-300">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Calendar startTime={startDate} mealPlan={mealPlan} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  locale,
  query,
}) => {
  const { mealPlanId } = query;
  const session = await getServerAuthSession({ req, res });
  const userId = session?.user?.id;

  if (userId === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        statusCode: 401,
      },
    };
  }

  if (typeof mealPlanId !== "string") {
    // Todo: Redirect to Create Meal Plan
    return {
      redirect: {
        destination: "/",
        permanent: false,
        statusCode: 401,
      },
    };
  }

  const translationsPromise = serverSideTranslations(locale ?? "en", [
    "common",
    "mealPlan",
  ]);

  const client = prisma as PrismaClient;

  const currentMonth = DateTime.now().startOf("month").toSQLDate();

  const mealPlan = await getMealPlan(client, userId, mealPlanId);

  return {
    props: {
      startDate: currentMonth,
      mealPlan,
      ...(await translationsPromise),
    },
  };
};

export default Home;
