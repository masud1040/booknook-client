
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Bell,
  Menu,
  X,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Replace with Better Auth session later.
  const user = null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
          {navLinks.map((link) => (
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

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-[#e2e8f0] p-1 pr-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <UserRound size={17} />
                </div>
                <ChevronDown size={15} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-48 rounded-xl border border-[#e2e8f0] bg-white p-2 shadow-lg">
                  <Link
                    href="/profile"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50"
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={15} />
                    Logout
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
            {navLinks.map((link) => (
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

          {!user && (
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
