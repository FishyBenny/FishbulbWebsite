import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto bg-dark text-white">
      <div className="site-container py-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <Image
            src="/images/logo-symbol.svg"
            alt="Fishbulb Solutions"
            width={52}
            height={52}
          />
          <a
            href="tel:0290031015"
            className="text-[15px] text-muted-blue transition-colors hover:text-white"
          >
            Phone: 02 9003 1015
          </a>
          <p className="text-xs text-muted-blue/80">
            &copy; Fishbulb Solutions Pty Ltd 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
