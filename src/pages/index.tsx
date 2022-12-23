import { type NextPage } from "next";
import Head from "next/head";
import { Calendar } from "../components/index/Calendar";

// from-[#2e026d] to-[#15162c]

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
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
