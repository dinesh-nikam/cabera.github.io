"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
}

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
}

const AccordionContext = React.createContext<{
  type: "single" | "multiple";
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
}>({
  type: "single",
  openItem: null,
  setOpenItem: () => {},
});

export function Accordion({
  type = "single",
  collapsible = false,
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}: AccordionProps) {
  const [openItem, setOpenItemState] = React.useState<string | null>(
    defaultValue || value || null,
  );

  const setOpenItem = (newValue: string | null) => {
    setOpenItemState(newValue);
    if (onValueChange && newValue) {
      onValueChange(newValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ type, openItem, setOpenItem }}>
      <div className={cn("space-y-4", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  className,
  children,
}: AccordionItemProps) {
  const { openItem } = React.useContext(AccordionContext);
  const isOpen = openItem === value;

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "border border-white/10 rounded-lg overflow-hidden transition-all",
        isOpen && "border-luxury-400/30",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AccordionTrigger({
  className,
  children,
}: AccordionTriggerProps) {
  const { openItem, setOpenItem } = React.useContext(AccordionContext);
  const item = React.useContext(AccordionContext);

  // Find the parent value
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const parentValue =
    buttonRef.current?.parentElement?.getAttribute("data-value") || "";
  const isOpen = openItem === parentValue;

  return (
    <button
      ref={buttonRef}
      className={cn(
        "flex w-full items-center justify-between p-4 text-left font-medium",
        "hover:bg-luxury-400/5 transition-colors",
        className,
      )}
      onClick={() => {
        const newValue = parentValue;
        setOpenItem(isOpen ? null : newValue);
      }}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180",
        )}
      />
    </button>
  );
}

export function AccordionContent({
  className,
  children,
}: AccordionContentProps) {
  const { openItem } = React.useContext(AccordionContext);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const parentValue =
    contentRef.current?.parentElement?.getAttribute("data-value") || "";
  const isOpen = openItem === parentValue;

  return (
    <div
      ref={contentRef}
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96" : "max-h-0",
        className,
      )}
    >
      <div className="p-4 pt-0">{children}</div>
    </div>
  );
}
