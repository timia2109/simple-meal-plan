import Link from "next/link";

export default function NotFound() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <title>Not found</title>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
            404 Not Found
          </h1>
          <p className="py-6">Could not find requested resource.</p>
          <Link className="btn btn-outline btn-primary" href="/">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}