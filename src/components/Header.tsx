"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const services = [
  {
    name: "Custom Software Development",
    href: "/services/software-development",
    icon: "/images/icons/software-dev.svg",
    description: "Custom-built software to provide your business with the tools it needs to thrive.",
  },
  {
    name: "AI Automations",
    href: "/services/ai-automations",
    icon: "/images/icons/integrations.svg",
    description: "Offload repetitive tasks, streamline complex processes using the power of AI",
  },
  {
    name: "Rapid Integrations",
    href: "/services/rapid-integrations",
    icon: "/images/icons/integrations.svg",
    description: "Connect your apps, automate data flow without per-workflow fees or clunky middleware",
  },
  {
    name: "Filemaker Development",
    href: "/services/filemaker-development",
    icon: "/images/icons/integrations.svg",
    description: "Our FileMaker developers make using data easier than ever.",
  },
  {
    name: "Web Design & Development",
    href: "/services/web-design-and-development",
    icon: "/images/icons/web-design.svg",
    description: "Designs that reflects your brand and effectively showcase your products or services.",
  },
  {
    name: "Fishbulb Pay",
    href: "/services/fishbulb-pay",
    icon: "/images/icons/fishbulb-pay.svg",
    description: "Elegant, branded, customer-friendly checkout process offering a wide range of payment options.",
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Work", href: "/our-work" },
  { name: "About", href: "/about" },
  { name: "Technology", href: "/technology" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 140);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-50 bg-white/0 pt-[30px]">
      <div className="site-container">
        <div className="flex min-h-[89px] items-start justify-between">
          <Link href="/" aria-label="home" className="shrink-0">
            <Image
              src="/images/logo.webp"
              alt="Fishbulb logo in the navbar. Links to homepage"
              width={214}
              height={65}
              priority
              className="h-[65px] w-[214px]"
            />
          </Link>

          <nav className="hidden items-start gap-[28px] pt-[20px] lg:flex">
            <NavLink active={isActive("/")} href="/">
              Home
            </NavLink>

            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className={`flex items-center gap-2 text-[15px] font-medium transition ${
                  pathname.startsWith("/services")
                    ? "text-primary"
                    : "text-[#0d172b] hover:text-primary"
                }`}
                aria-expanded={dropdownOpen}
              >
                Services
                <svg
                  className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {pathname.startsWith("/services") && (
                <span className="mx-auto mt-3 block h-1.5 w-1.5 rounded-full bg-primary" />
              )}

              {dropdownOpen && (
                <div className="absolute left-1/2 top-full w-[600px] -translate-x-1/2 pt-7">
                  <div className="rounded-[3px] bg-white p-6 shadow-[0_20px_60px_rgba(27,38,65,0.14)] ring-1 ring-black/5">
                    <p className="mb-4 text-sm font-semibold text-foreground">
                      Services
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="group flex gap-3 rounded-[3px] p-2 transition hover:bg-light-gray-bg"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Image src={service.icon} alt="" width={34} height={34} className="mt-1 h-[34px] w-[34px]" />
                          <span>
                            <span className="block text-[14px] font-semibold text-foreground group-hover:text-primary">
                              {service.name}
                            </span>
                            <span className="mt-1 block text-[12px] leading-snug text-gray-text">
                              {service.description}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <NavLink key={link.href} href={link.href} active={isActive(link.href)}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="mt-4 rounded-sm p-2 text-foreground transition hover:bg-light-gray-bg lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-[95px] z-40 max-h-[calc(100vh-95px)] overflow-y-auto bg-white px-6 py-6 shadow-xl lg:hidden">
          <nav className="mx-auto max-w-xl space-y-2">
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>
              Home
            </MobileLink>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-sm px-3 py-3 text-left text-base font-medium text-foreground"
              onClick={() => setMobileServicesOpen((open) => !open)}
            >
              Services
              <svg className={`h-4 w-4 transition ${mobileServicesOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none">
                <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="space-y-1 border-l border-primary/20 pl-4">
                {services.map((service) => (
                  <MobileLink
                    key={service.href}
                    href={service.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {service.name}
                  </MobileLink>
                ))}
              </div>
            )}
            {navLinks.slice(1).map((link) => (
              <MobileLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </MobileLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative text-[15px] font-medium transition ${
        active ? "text-primary" : "text-[#0d172b] hover:text-primary"
      }`}
    >
      {children}
      {active && (
        <span className="absolute left-1/2 top-[28px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
      )}
    </Link>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block rounded-sm px-3 py-3 text-base font-medium text-foreground transition hover:bg-light-gray-bg"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
