"use client";

import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
}

export default function Accordion({
  items,
  defaultOpen = 0,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <details
          key={index}
          open={openIndex === index}
          className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-udan-green transition-colors"
        >
          <summary
            className="cursor-pointer flex justify-between items-center w-full px-4 sm:px-6 py-3 sm:py-4 font-heading font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              toggleItem(index);
            }}
          >
            <span className="text-sm sm:text-base">{item.question}</span>
            <span className="text-2xl text-udan-green font-light group-open:rotate-45 transition-transform duration-200">
              +
            </span>
          </summary>

          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 text-gray-700 text-xs sm:text-sm leading-relaxed">
            {typeof item.answer === "string" ? (
              <p>{item.answer}</p>
            ) : (
              item.answer
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
