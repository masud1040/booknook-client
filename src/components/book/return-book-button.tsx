
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

interface ReturnBookButtonProps {
  borrowId: string;
}

export function ReturnBookButton({
  borrowId,
}: ReturnBookButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrowId}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to return book!");
        return;
      }

      toast.success("Book returned successfully!");
      router.refresh();
    } catch (error) {
      console.error("Return book error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleReturn}
      disabled={loading}
      variant="outline"
      className="border-blue-200 text-blue-600 hover:bg-blue-50"
    >
      {loading ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <RotateCcw className="mr-2 size-4" />
      )}
      {loading ? "Returning..." : "Return Book"}
    </Button>
  );
}
