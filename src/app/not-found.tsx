import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found – Fishbulb Solutions",
};

export default function NotFound() {
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
        Page not found
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "#6b7280",
          margin: "0 0 2rem",
          maxWidth: "400px",
        }}
      >
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "0.875rem 2rem",
          backgroundColor: "#078bd3",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: 600,
          textDecoration: "none",
          borderRadius: "3px",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
