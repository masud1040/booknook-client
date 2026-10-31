
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Bell,
  Menu,
  X,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book", private: true },
  { name: "My Books", href: "/my-books", private: true },
  { name: "My Borrows", href: "/my-borrows", private: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const visibleLinks = navLinks.filter(
    (link) => !link.private || !!user
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await authClient.signOut();

      toast.success("Logged out successfully!");

      setProfileOpen(false);
      setMobileOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb] text-white shadow-sm">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="text-[21px] font-extrabold leading-none tracking-tight text-[#0f172a]">
              BookNook
            </h1>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[1.3px] text-[#94a3b8]">
              A Small Online Library
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-xl border border-[#e9eef5] bg-[#f6f8fb] p-1.5 lg:flex">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                isActive(link.href)
                  ? "bg-white text-[#1d4ed8] shadow-sm"
                  : "text-[#64748b] hover:text-[#1d4ed8]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2e8f0] text-[#475569] transition hover:bg-[#f8fafc]"
          >
            <Bell size={19} strokeWidth={1.8} />
          </button>

          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-100" />
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-[#e2e8f0] py-1 pl-1 pr-3 transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-700">
                  {user.image ? (
                    <Image
                      width={40}
                      height={40}
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={19} />
                  )}
                </div>

                <span className="max-w-[110px] truncate text-sm font-semibold text-slate-700">
                  {user.name}
                </span>

                <ChevronDown size={15} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-[#e2e8f0] bg-white p-2 shadow-lg">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <UserRound size={16} />
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut size={16} />
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl bg-[#1d4ed8] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#1e40af]"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-xs font-bold text-[#334155] transition hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl border border-[#e2e8f0] p-2.5 text-[#334155] lg:hidden"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-[#e2e8f0] bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {isPending ? (
            <div className="mt-4 h-10 animate-pulse rounded-lg bg-slate-100" />
          ) : user ? (
            <div className="mt-4 border-t border-slate-100 pt-4">
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-700">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-full w-full object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <UserRound size={20} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    My Profile
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-3 text-sm font-bold text-red-600 disabled:opacity-50"
              >
                <LogOut size={17} />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-blue-700 py-3 text-center text-sm font-bold text-white"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-slate-200 py-3 text-center text-sm font-bold text-slate-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
