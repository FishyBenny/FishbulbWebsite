"use client";

import { useState, type FormEvent } from "react";

type ContactFormProps = {
  variant?: "light" | "dark";
};

export default function ContactForm({ variant = "light" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const isDark = variant === "dark";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={`py-10 text-center ${isDark ? "text-white" : "bg-white"}`}>
        <h3 className={`live-h3 text-2xl ${isDark ? "text-white" : ""}`}>
          Thank you!
        </h3>
        <p className={`mt-2 ${isDark ? "text-muted-blue" : "live-copy"}`}>
          Your submission has been received!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2
        className={
          isDark
            ? "font-heading text-[40px] font-normal leading-tight tracking-[1px] text-[#d7deec] md:text-[44px]"
            : "live-h2"
        }
      >
        Send us your details and we&apos;ll be in touch
      </h2>
      <form onSubmit={handleSubmit} className="mt-10 max-w-[1024px]">
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2">
          <Field label="Name" name="name" required variant={variant} />
          <Field label="Email" name="email" type="email" required variant={variant} />
          {!isDark && (
            <Field label="Work Email" name="workEmail" type="email" variant={variant} />
          )}
          <Field label="Phone" name="phone" type="tel" variant={variant} />
          <Field label="Company" name="company" variant={variant} />
          <label className="sm:col-span-2">
            <span
              className={
                isDark
                  ? "sr-only"
                  : "mb-2 block text-[15px] font-medium text-foreground"
              }
            >
              Message
            </span>
            <textarea
              name="message"
              placeholder={isDark ? "tell us something about your project" : undefined}
              rows={5}
              className={
                isDark
                  ? "min-h-[148px] w-full resize-none border border-[#5f6f95] bg-transparent px-5 py-4 text-[18px] text-[#d7deec] placeholder:text-[#5d6578] outline-none transition focus:border-[#8ea2d4]"
                  : "w-full resize-none border border-[#d7dde8] bg-white px-4 py-3 text-[15px] text-foreground outline-none transition focus:border-primary"
              }
            />
          </label>
        </div>

        <div className="mt-9 flex h-[112px] w-[448px] max-w-full items-center justify-between rounded-[3px] border border-[#d7dde8] bg-[#f9f9f9] px-5 text-[20px] text-[#111827] shadow-sm">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="h-10 w-10 accent-primary" />
            <span>I&apos;m not a robot</span>
          </label>
          <span className="text-center text-[14px] leading-tight text-gray-text">
            reCAPTCHA
            <br />
            <span className="text-[10px]">Privacy - Terms</span>
          </span>
        </div>

        <button
          type="submit"
          className={
            isDark
              ? "mt-[54px] flex h-[108px] w-[264px] items-center justify-center bg-[#078bd3] text-[28px] font-semibold text-white transition hover:bg-primary"
              : "live-cta mt-8"
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  className = "",
  variant = "light",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <label className={className}>
      <span
        className={
          isDark
            ? "sr-only"
            : "mb-2 block text-[15px] font-medium text-foreground"
        }
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={isDark ? label.toUpperCase() : undefined}
        required={required}
        className={
          isDark
            ? "h-[114px] w-full border border-[#5f6f95] bg-transparent px-5 text-[17px] uppercase tracking-[0.16em] text-[#d7deec] placeholder:text-[#d7deec] outline-none transition focus:border-[#8ea2d4]"
            : "w-full border border-[#d7dde8] bg-white px-4 py-3 text-[15px] text-foreground outline-none transition focus:border-primary"
        }
      />
    </label>
  );
}
