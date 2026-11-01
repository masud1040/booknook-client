
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import MyBorrowCard from "@/components/book/MyBorrowCard";
import type { IBorrow } from "@/lib/types/borrow";

const MyBorrowsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return null;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/borrows/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch borrowed books!");
  }

  const borrows: IBorrow[] = await res.json();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 md:px-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-normal tracking-tight">
          My Borrowed Books
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage and view all the books you have borrowed.
        </p>
      </div>

      {/* Borrowed Books List */}
      <div className="flex flex-col gap-4">
        {borrows.length > 0 ? (
          borrows.map((borrow) => (
            <MyBorrowCard
              borrow={borrow}
              key={borrow._id}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed p-12 text-center">
            <h2 className="text-lg font-semibold">
              No borrowed books found!
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              You haven't borrowed any books yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBorrowsPage;
