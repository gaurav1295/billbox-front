import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0F0720] bg-gradient-to-b from-blue-950/50 to-[#0F0720]">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <MessageSquare className="h-6 w-6 text-blue-400" />
          <span className="ml-2 text-xl font-medium text-white">Billbox</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-600/10 px-3 py-1 text-sm text-blue-400">
                  Collect your bills and make them useful
                </div>
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI + Bills
                </h1>
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Please you reach your financial goals
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Ideal for developers looking to build SaaS applications using OpenAI and Next.js, this starter kit comes with pre-configured and pre-built examples, making it easier to quickly kickstart your AI startup.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Try Now
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="relative mx-auto max-w-5xl">
              <div className="rounded-lg border border-blue-600/20 bg-blue-950/10 p-8">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="h-4 w-3/4 rounded bg-blue-600/20" />
                  <div className="h-4 w-2/4 rounded bg-blue-600/20" />
                  <div className="h-4 w-5/6 rounded bg-blue-600/20" />
                  <div className="h-4 w-1/4 rounded bg-blue-600/20" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
