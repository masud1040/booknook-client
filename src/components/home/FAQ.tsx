
"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    id: "faq-1",
    question: "What is BookNook and how does it work?",
    answer:
      "BookNook is an online book collection and sharing platform. You can explore books from different categories, view book details, and borrow your favorite books directly from the platform.",
  },
  {
    id: "faq-2",
    question: "How can I borrow a book?",
    answer:
      "First, log in to your BookNook account. Browse the All Books page, select your preferred book, and visit its details page. Click the Borrow button and choose your return date to complete the process.",
  },
  {
    id: "faq-3",
    question: "How many books can I borrow at a time?",
    answer:
      "You can borrow a book as long as copies are available. You cannot borrow the same book again while you already have an active borrowing record for it.",
  },
  {
    id: "faq-4",
    question: "Is there any late return fee?",
    answer:
      "BookNook currently does not implement any late return fee. However, we encourage all readers to return borrowed books within their selected return date.",
  },
  {
    id: "faq-5",
    question: "How can I add my own book to BookNook?",
    answer:
      "Log in to your account and navigate to the Add Book page. Enter the book title, author, category, description, cover image, and available copies, then submit the form.",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const allExpanded =
    openItems.length === faqData.length;

  const handleExpandAll = () => {
    setOpenItems(
      allExpanded ? [] : faqData.map((faq) => faq.id)
    );
  };

  return (
    <section className="bg-[#F4F7FB] px-5 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[24px] border border-slate-300 bg-white p-6 shadow-sm sm:p-8 lg:p-10">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 border-b border-slate-100 pb-7 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <Badge
              variant="outline"
              className="mb-3 rounded-full border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700"
            >
              <BookOpen size={13} className="mr-1" />
              Common Library Q&A
            </Badge>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Find answers to common questions about borrowing,
              managing, and sharing books on BookNook.
            </p>
          </div>

          {/* Expand / Collapse All */}
          <Button
            type="button"
            variant="outline"
            onClick={handleExpandAll}
            className="h-10 shrink-0 self-start rounded-xl border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 lg:self-center"
          >
            {allExpanded ? "Collapse All" : "Expand All"}
          </Button>
        </div>

        {/* FAQ Accordion */}
        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className="space-y-3"
        >
          {faqData.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="overflow-hidden rounded-2xl border border-slate-300 px-5 transition-colors duration-200 hover:border-blue-300 data-[state=open]:border-blue-300 data-[state=open]:bg-blue-50/30 sm:px-6"
            >
              <AccordionTrigger className="gap-4 py-5 text-left text-sm font-semibold text-slate-800 hover:no-underline hover:text-blue-700 [&>svg]:hidden">
                <div className="flex flex-1 items-center gap-3">
                  <span className="shrink-0 font-mono text-sm font-bold text-blue-700">
                    Q{String(index + 1).padStart(2, "0")}.
                  </span>

                  <span>{faq.question}</span>
                </div>

                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180">
                  <ChevronDown size={15} />
                </span>
              </AccordionTrigger>

              <AccordionContent className="pb-5 pl-9 pr-2 text-sm leading-7 text-slate-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom Note */}
        <div className="mt-7 border-t border-slate-100 pt-5 text-center">
          <p className="text-sm text-slate-500">
            Still have questions? Explore our{" "}
            <a
              href="/books"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              book collection
            </a>
            .
          </p>
        </div>

      </div>
    </section>
  );
}
