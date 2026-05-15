"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "fishbulb-cookie-choice";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVisible(window.localStorage.getItem(STORAGE_KEY) === null);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  function close(choice: "declined" | "saved") {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] bg-[#1b1b1d] px-6 py-8 text-white shadow-2xl">
      <div className="mx-auto max-w-[1000px]">
        <div className="max-w-3xl">
          <h2 className="font-sans text-2xl font-semibold tracking-normal text-white">
            This website uses cookies
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            This website uses cookies to improve user experience. By using our
            website you consent to all cookies in accordance with our{" "}
            <a href="/cookie-policy" className="text-primary hover:underline">
              Cookie Policy
            </a>
            .
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-4">
          <button
            type="button"
            className="min-h-[54px] min-w-[138px] bg-white px-7 text-sm font-semibold text-[#17172a] transition hover:bg-white/90"
            onClick={() => close("declined")}
          >
            Decline All
          </button>
          <button
            type="button"
            className="min-h-[54px] min-w-[158px] bg-primary px-7 text-sm font-semibold text-white transition hover:opacity-90"
            onClick={() => close("saved")}
          >
            Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
