import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Zap, Users } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-white dark:selection:text-zinc-900">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-zinc-100 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-white" />
          <span className="text-xl font-bold tracking-tight">Fesalice</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium transition-colors hover:text-zinc-600 dark:hover:text-zinc-400"
          >
            Sign in
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-1 pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pb-24 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
              Modern Management for <br />
              <span className="bg-gradient-to-r from-zinc-500 to-zinc-800 bg-clip-text text-transparent dark:from-zinc-400 dark:to-white">
                Multi-Tenant Businesses
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
              The all-in-one platform to streamline your operations, track assets, and manage clients with enterprise-grade security and AI-powered insights.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/login"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 text-lg font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 sm:w-auto"
              >
                Get Started free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex h-14 w-full items-center justify-center rounded-full border border-zinc-200 bg-transparent px-8 text-lg font-medium transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:hover:bg-zinc-900 sm:w-auto"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-zinc-100 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Multi-Tenant Architecture",
                  description: "Isolated environments for each business unit or client, ensuring total data privacy.",
                  icon: Users,
                },
                {
                  title: "Real-time Analytics",
                  description: "Deep insights into your operations with beautiful, interactive dashboards.",
                  icon: BarChart3,
                },
                {
                  title: "Asset Tracking",
                  description: "Manage SIM cards, devices, and inventory with precision and ease.",
                  icon: Zap,
                },
                {
                  title: "Audit & Compliance",
                  description: "Full visibility into every action with automated audit logging and security checks.",
                  icon: ShieldCheck,
                },
              ].map((feature, idx) => (
                <div key={idx} className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-12 dark:border-zinc-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-zinc-900 dark:bg-white" />
            <span className="text-lg font-bold">Fesalice</span>
          </div>
          <p className="text-sm text-zinc-500">
            &copy; 2026 Fesalice Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
