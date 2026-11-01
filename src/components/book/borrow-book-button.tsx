
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookCheck, CalendarDays, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

interface BorrowBookButtonProps {
  bookId: string;
  bookTitle: string;
  bookImage: string;
  availableCopies: number;
  userEmail: string;
}

function getLocalDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function BorrowBookButton({
  bookId,
  bookTitle,
  bookImage,
  availableCopies,
  userEmail,
}: BorrowBookButtonProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [returnDate, setReturnDate] = useState("");

  const today = getLocalDate();

  const handleBorrow = async () => {
    if (!returnDate) {
      toast.error("Please select a return date!");
      return;
    }

    if (returnDate <= today) {
      toast.error("Return date must be after today!");
      return;
    }

    const borrowData = {
      bookId,
      userEmail,
      bookTitle,
      bookImage,
      borrowDate: new Date().toISOString(),
      returnDate: new Date(`${returnDate}T23:59:59`).toISOString(),
    };

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(borrowData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to borrow this book!");
        return;
      }

      toast.success("Book borrowed successfully!");

      setOpen(false);
      router.push("/my-borrows");
      router.refresh();
    } catch (error) {
      console.error("Borrow book error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (availableCopies < 1) {
    return (
      <Button
        disabled
        className="h-12 w-full cursor-not-allowed rounded-xl bg-slate-300 text-base font-semibold text-slate-600"
      >
        <BookCheck className="mr-2 size-5" />
        Not Available
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
      >
        <BookCheck className="size-5" />
        Borrow This Book
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>
            Confirm your book and select a return date.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-3">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={bookImage}
              alt={bookTitle}
              fill
              sizes="64px"
              className="object-contain p-1"
            />
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-2 font-semibold text-slate-900">
              {bookTitle}
            </h3>
            <p className="mt-1 text-sm text-emerald-600">
              {availableCopies} copies available
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="return-date">Return Date</Label>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-3 size-4 text-slate-400" />

            <Input
              id="return-date"
              type="date"
              min={today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="pl-10"
            />
          </div>

          <p className="text-xs text-slate-500">
            Please select a date after today.
          </p>
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
            type="button"
            onClick={handleBorrow}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Borrowing...
              </>
            ) : (
              "Confirm Borrow"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
