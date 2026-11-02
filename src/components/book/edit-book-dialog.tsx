
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

import type { IBook } from "@/lib/types/book";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

interface EditBookDialogProps {
  book: IBook;
}

export function EditBookDialog({ book }: EditBookDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    category: book.category,
    image: book.image,
    description: book.description,
    totalCopies: String(book.totalCopies),
    userName: book.userName,
    userEmail: book.userEmail,
  });

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.author.trim() ||
      !form.image.trim() ||
      !form.description.trim() ||
      !form.totalCopies
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const totalCopies = Number(form.totalCopies);

    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be at least 1!");
      return;
    }

    const bookData = {
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category,
      image: form.image.trim(),
      description: form.description.trim(),
      totalCopies,
    };

    try {
      setLoading(true);

      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        toast.error(data.message || "Failed to update book!");
        return;
      }

      toast.success("Book updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Update book error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon" title="Edit Book">
            <Pencil />
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Update your book information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Book Title</Label>
              <Input
                id="edit-title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-author">Author</Label>
              <Input
                id="edit-author"
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={form.category}
              onValueChange={(value) => update("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-image">Book Image URL</Label>
            <Input
              id="edit-image"
              type="url"
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-copies">Total Copies</Label>
            <Input
              id="edit-copies"
              type="number"
              min="1"
              step="1"
              value={form.totalCopies}
              onChange={(e) => update("totalCopies", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Owner Information - Read Only */}
          <div className="space-y-4 rounded-xl border bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">
              Added By
            </p>

            <div className="space-y-2">
              <Label htmlFor="edit-user-name">User Name</Label>
              <Input
                id="edit-user-name"
                value={form.userName}
                readOnly
                className="bg-slate-100 text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-user-email">User Email</Label>
              <Input
                id="edit-user-email"
                value={form.userEmail}
                readOnly
                className="bg-slate-100 text-slate-500"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
