
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import type { IBook } from "@/lib/types/book";
import { MyBooksGrid } from "@/components/book/my-books-grid";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-books/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("My Books API Error:", res.status, errorText);

    throw new Error("Failed to fetch your books!");
  }

  const books: IBook[] = await res.json();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            Your Collection
          </p>

          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            My Books
          </h1>

          <p className="mt-3 text-slate-500">
            Manage the books you have added to BookNook.
          </p>
        </div>

        <MyBooksGrid books={books} />
      </div>
    </main>
  );
};

export default MyBooksPage;
