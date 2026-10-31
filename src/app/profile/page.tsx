
"use client";

import { authClient } from "@/lib/auth-client";
import { UserRound, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <UserRound size={48} className="text-slate-400" />
        <h2 className="mt-4 text-xl font-bold text-slate-800">
          Please Login First
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          You need to login to view your profile.
        </p>
        <Link
          href="/sign-in"
          className="mt-5 rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white hover:bg-blue-800"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#f4f7fb] px-5 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}
          <div className="bg-blue-700 px-6 py-10 text-center text-white">
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white/30 bg-white text-blue-700">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={45} />
              )}
            </div>

            <h1 className="mt-4 text-2xl font-bold">
              {user.name}
            </h1>

            <p className="mt-1 text-sm text-blue-100">
              BookNook Member
            </p>
          </div>

          {/* Profile Information */}
          <div className="p-6 sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-slate-800">
              Profile Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <UserRound size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    Full Name
                  </p>
                  <p className="truncate font-semibold text-slate-800">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Mail size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    Email Address
                  </p>
                  <p className="truncate font-semibold text-slate-800">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Account Status
                  </p>
                  <p className="font-semibold text-green-600">
                    Active Member
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
