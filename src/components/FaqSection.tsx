"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="w-full px-6 py-12 bg-zinc-950 text-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gold-500">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-left">
              Can I book a home service?
            </AccordionTrigger>
            <AccordionContent>
              Yes! We offer both in-shop and home grooming services. Just choose your preference while booking.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger>
              How do I pay for the service?
            </AccordionTrigger>
            <AccordionContent>
              Payment is made at the appointment via cash or mobile money. We're working on online payments soon.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger>
              What’s the cancellation policy?
            </AccordionTrigger>
            <AccordionContent>
              You can cancel up to 2 hours before your appointment without any charge.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger>
              Can I reschedule an appointment?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely. Just visit the "My Bookings" page and select a new time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
