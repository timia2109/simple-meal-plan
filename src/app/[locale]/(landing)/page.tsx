import { getScopedI18n } from "@/locales/server";
import { SignInButton } from "./SignInButton";

export default async function LandingPage() {
  const t = await getScopedI18n("landing");

  return (
    <div className="p-12">
      <div className="fw-bolder flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-8 ">
          <h1 className="text-6xl">
            INDEX Text
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text font-semibold text-transparent">
              {" "}
              {t("title")}
            </span>
          </h1>

          <p className="text-center text-xl md:w-1/2">Main Text</p>
        </div>
        <SignInButton />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="card w-96 bg-base-300 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title flex justify-center">
                Feature Heading
              </h2>
              <p>Feature Box</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
