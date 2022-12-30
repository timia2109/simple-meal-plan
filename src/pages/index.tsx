import { type NextPage } from "next";
import Head from "next/head";
import { Calendar } from "../components/index/Calendar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Simple Meal Plan</title>
        <meta name="description" content="A very simple meal plan" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#5bbad5" />
        <meta name="theme-color" content="#5bbad5" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-blue-300">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Calendar />
        </div>
      </main>
    </>
  );
};

export default Home;
