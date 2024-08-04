import { setStaticParamsLocale } from "next-international/server";
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";

export default function NotFound() {
  // This guard should protect, that the locale is set only in production build
  // without the guard, it will always override the current locale
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    setStaticParamsLocale("en");
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <title>Not found</title>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
            404 Not Found
          </h1>
          <p className="py-6">Could not find requested resource.</p>
          <a className="btn btn-outline btn-primary" href="/">
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}
