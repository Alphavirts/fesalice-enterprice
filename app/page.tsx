import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Open Fesalice Dashboard
      </Link>
    </div>
  );
}