
import Link from "next/link";
import {
  BookOpen,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-8 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <BookOpen size={23} />
              </div>

              <span className="text-2xl font-bold tracking-tight text-slate-900">
                Book<span className="text-blue-600">Nook</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-slate-500">
              Discover your next favorite book. Explore knowledge,
              share stories, and make reading a part of your everyday life.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-bold text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                f
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-bold text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                ig
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-bold text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                gh
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-slate-900">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    {link.label}

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-slate-900">
              Categories
            </h3>

            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/books?category=${category}`}
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-slate-900">
              Get in Touch
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                <span>support@booknook.com</span>
              </li>

              <li className="flex items-start gap-3 text-sm text-slate-500">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                <span>+880 1XXX-XXXXXX</span>
              </li>

              <li className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                <span>Bangladesh</span>
              </li>
            </ul>

            <Link
              href="/books"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Explore Books
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} BookNook. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Made with <span className="text-red-500">♥</span> for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
