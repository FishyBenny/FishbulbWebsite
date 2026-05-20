"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Fishbulb page error:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "2rem",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        textAlign: "center",
      }}
    >
      <img
        src="https://cdn.prod.website-files.com/655d6e5fca24f94d1e6b2a27/655edfc109e863ce99ac2f2c_Image-logo-symbol.svg"
        alt="Fishbulb Solutions"
        width={80}
        height={80}
        style={{ marginBottom: "2rem", opacity: 0.6 }}
      />
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          color: "#0d172b",
          margin: "0 0 0.75rem",
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "#6b7280",
          margin: "0 0 2rem",
          maxWidth: "400px",
        }}
      >
        We&apos;re having trouble loading this page. Please try again in a
        moment.
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => unstable_retry()}
          style={{
            padding: "0.875rem 2rem",
            backgroundColor: "#078bd3",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.875rem 2rem",
            backgroundColor: "#f3f4f6",
            color: "#0d172b",
            fontSize: "1rem",
            fontWeight: 600,
            textDecoration: "none",
            borderRadius: "3px",
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
