import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-20 font-body">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f0f9ed] text-[#63b849] font-heading text-4xl font-bold mb-6 border border-[#63b849]/20">
          404
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b2238] mb-4">
          Article or Page Not Found
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
          The publication or page you are trying to view might have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/blog"
            className="pill-btn pill-blue text-xs sm:text-sm px-6 py-2.5"
          >
            Browse News &amp; Insights
          </Link>
          <Link
            href="/"
            className="pill-btn pill-green text-xs sm:text-sm px-6 py-2.5"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
