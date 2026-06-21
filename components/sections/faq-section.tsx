"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the fare for Pune to Mumbai cab?",
    answer:
      "Our Pune to Mumbai cab service starts at ₹2,500 for Sedan, ₹3,500 for SUV, and ₹5,000 for Luxury vehicles. Prices vary based on pickup/drop locations, time of day, and season.",
  },
  {
    question: "How do I book a cab for airport transfer?",
    answer:
      "Simply enter your pickup location and 'Pune Airport' or 'Mumbai Airport' as destination, select date/time, choose your vehicle, and confirm. Our drivers track flights for delays.",
  },
  {
    question: "Do you provide 24x7 service?",
    answer:
      "Yes, we operate round the clock with verified drivers always available. Airport transfers have special night surcharges during 11 PM to 5 AM.",
  },
  {
    question: "What vehicles are available for corporate travel?",
    answer:
      "We offer dedicated corporate accounts with choice of Sedan, SUV, Premium SUV, and Luxury vehicles. Monthly billing, centralized reporting, and dedicated account managers available.",
  },
  {
    question: "Can I book outstation cabs for long distances?",
    answer:
      "Yes, we provide outstation cabs for all major destinations including Shirdi, Nashik, Goa, Mahabaleshwar, and Lonavala. Overnight stays and multiple-day packages available.",
  },
  {
    question: "How do I know my driver is verified?",
    answer:
      "All our drivers undergo background verification, driving license validation, and vehicle inspection. You can view driver photo, name, rating, and license plate in the app before boarding.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including UPI, Credit/Debit cards, Net Banking, and Cash. Corporate accounts can also opt for monthly billing with GST invoices.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel up to 2 hours before pickup for free. Cancellations within 2 hours attract 50% charges. No-shows are charged full fare.",
  },
];

export function FaqSection() {
  return (
    <section
      className="py-20 bg-background"
      aria-label="Frequently Asked Questions"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to know about our cab services
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="card-luxury border-none px-6"
                >
                  <AccordionTrigger className="text-left font-semibold py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-secondary pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
