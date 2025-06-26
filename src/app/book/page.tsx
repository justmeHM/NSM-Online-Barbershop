import React, { useState } from "react";
import toast from "react-hot-toast";

export default function BookPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    service: "",
    type: "shop",
    date: "",
    time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.service) {
      toast.error("Please select a service.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Booking saved successfully!");
        setForm({ service: "", type: "shop", date: "", time: "" });
      } else {
        toast.error("Error saving booking.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* your form fields */}
    </form>
  );
}
