
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookPlus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

const initialForm = {
  title: "",
  author: "",
  category: "",
  image: "",
  description: "",
  totalCopies: "",
};

export default function AddBookPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please login to add a book!");
      router.push("/sign-in");
      return;
    }

    setLoading(true);

    const bookData = {
      ...form,
      userName: user.name,
      userEmail: user.email,
    };

    try {
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookData),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to add book!");
        return;
      }

      toast.success("Book added successfully!");

      setForm(initialForm);

      router.push("/books");
      router.refresh();
    } catch (error) {
      console.error("Add Book Error:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <BookPlus size={48} className="text-blue-600" />

        <h1 className="mt-4 text-2xl font-bold text-slate-800">
          Login Required
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Please login to add a new book to BookNook.
        </p>

        <Button
          onClick={() => router.push("/sign-in")}
          className="mt-5 bg-blue-700 hover:bg-blue-800"
        >
          Login Now
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-5 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Page Heading */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Book Management
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Add New Book
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Share your favorite books with the BookNook community.
          </p>
        </div>

        {/* Add Book Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6">

            {/* Book Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Book Title</Label>

              <Input
                id="title"
                placeholder="Enter book title"
                value={form.title}
                onChange={(event) =>
                  update("title", event.target.value)
                }
                required
              />
            </div>

            {/* Author and Category */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="author">Author Name</Label>

                <Input
                  id="author"
                  placeholder="Enter author name"
                  value={form.author}
                  onChange={(event) =>
                    update("author", event.target.value)
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>

                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    update("category", value ?? "")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
              <Label htmlFor="image">Book Cover Image URL</Label>

              <Input
                id="image"
                type="url"
                placeholder="https://example.com/book-cover.jpg"
                value={form.image}
                onChange={(event) =>
                  update("image", event.target.value)
                }
                required
              />
            </div>

            {/* Total Copies */}
            <div className="grid gap-2">
              <Label htmlFor="totalCopies">Total Copies</Label>

              <Input
                id="totalCopies"
                type="number"
                placeholder="Enter available book quantity"
                value={form.totalCopies}
                onChange={(event) =>
                  update("totalCopies", event.target.value)
                }
                min="1"
                step="1"
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Book Description</Label>

              <Textarea
                id="description"
                placeholder="Write about this book..."
                className="min-h-36 resize-y"
                value={form.description}
                onChange={(event) =>
                  update("description", event.target.value)
                }
                required
              />
            </div>

            {/* User Information */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-900">
                Added By
              </p>

              <p className="mt-2 text-sm text-blue-800">
                Name: {user.name}
              </p>

              <p className="mt-1 text-sm text-blue-800">
                Email: {user.email}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => setForm(initialForm)}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 size={17} />
              Clear Form
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-700 text-white hover:bg-blue-800"
            >
              <BookPlus size={17} />

              {loading ? "Adding Book..." : "Add Book"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
