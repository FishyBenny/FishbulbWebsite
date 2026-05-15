import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const CDN =
  "https://cdn.prod.website-files.com/655d6e5fca24f94d1e6b2a27";

export function cdn(path: string) {
  return `${CDN}/${path}`;
}

export const techLogos = [
  ["Angular", cdn("65796187a24da90d0e5ac120_Logo-Angular.webp")],
  ["React JS", cdn("657961876134bbcf78fc91bc_Logo-React.webp")],
  ["JQuery", cdn("657961862e8416b5d8768130_Logo-JQuery.webp")],
  ["Gatsby JS", cdn("657961863a1bbf4d8e6fffe6_Logo-Gatsby.webp")],
  ["Vercel", cdn("65796186dcc066c7951391c0_Logo-Vercel.webp")],
  ["Node JS", cdn("65796187e669021cfdd6f772_Logo-NodeJS.webp")],
  ["Nest JS", cdn("65796187dcc066c7951391f0_Logo-NestJS.webp")],
  ["Laravel", cdn("657961865b4fde66588c23ca_Logo-Laravel.webp")],
  ["PHP", cdn("657961879b87f74ac2c53ef3_Logo-PHP.webp")],
  [".NET", cdn("65796187a24da90d0e5ac12f_Logo-Net.webp")],
  ["React Native", cdn("65796186ff176efeacf05064_Logo-ReactNative.webp")],
  ["Filemaker Pro", cdn("6579618685cb0c6771bb356b_Logo-FilemakerPro.webp")],
  ["C++", cdn("6579618642e4ef8469b9403a_Logo-C%2B%2B.webp")],
  ["Wordpress", cdn("65796187f89e7a351914b974_Logo-Wordpress.webp")],
  ["Builder IO", cdn("657961865b4fde66588c23e9_Logo-Builder.webp")],
  ["Joomla", cdn("65796186f2070714cc99d812_Logo-Joomla.webp")],
  ["Drupal", cdn("657961879b5f4a1289de754b_Logo-Drupal.webp")],
  ["Magento", cdn("65796186fa687744793ca66b_Logo-Magento.webp")],
  ["Webflow", cdn("657961875b4fde66588c2601_Logo-Webflow.webp")],
  ["My SQL", cdn("657961871069144ece05575e_Logo-Mysql.webp")],
  ["PostgreSQL", cdn("657961875f032a651e134ee7_Logo-Postgresql.webp")],
  ["SQL", cdn("657961862c273d30f0431898_Logo-SQL.webp")],
  ["Mongo DB", cdn("6579618694a36052610177fd_Logo-MongoDB.webp")],
  ["Couch DB", cdn("6579618623e850c0f463d273_Logo-CouchDB.webp")],
  ["Azure", cdn("657a43330170074bc6918df0_Logo-Azure.webp")],
  ["Amazon Web Services", cdn("657a43339a614cce5e552156_Logo-AWS.webp")],
  ["Google Cloud", cdn("657a4333d974bf3bd0bdacb1_Logo-GoogleCloud.webp")],
  ["PWA", cdn("657a43d7419519805837c809_Logo-PWA.webp")],
  ["Mitosis", cdn("657a486a517cce500c1c74c1_Logo-Mitosis.webp")],
] as const;

export const clientStories = [
  {
    name: "Kirstie Wells",
    role: "Global Office Manager, C3 Global",
    image: cdn("656931982800036a4d20de2b_client-profile.png"),
    quote:
      "Fishbulb Solutions turned our membership database around, boosting member engagement and satisfaction. Their expertise now extends across all our digital platforms.",
  },
  {
    name: "Michael Baker",
    role: "Formerly of Vodafone Australia Pty Limited",
    image: cdn("659385214586cb3cc0998dee_2.webp"),
    quote:
      "Andrew and the team demonstrated exceptional expertise in developing a custom data centre asset management software tailored for us.",
  },
  {
    name: "Jodie Williams",
    role: "Director, Action Dance Academy",
    image: cdn("65dff3f3e1392a369dfff455_clients-round-4.webp"),
    quote:
      "For 15 years, Fishbulb Solutions has been our go-to for navigating the complexities of dance studio administration.",
  },
  {
    name: "Danny Gellert",
    role: "Director of Cello Paper Pty Ltd",
    image: cdn("65938521744b0818f586a802_4.webp"),
    quote:
      "They delivered a custom barcode, labelling, and dispatch application that integrated with our existing systems at a fraction of the cost quoted elsewhere.",
  },
] as const;

export function PageHero({
  eyebrow,
  title,
  body,
  cta,
  image,
  imageAlt = "",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="section-pad overflow-hidden">
      <div className="site-container grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          {eyebrow && (
            <p className="mb-5 text-[15px] font-semibold text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="live-h1">{title}</h1>
          {body && <p className="mt-6 max-w-[620px] live-copy">{body}</p>}
          {cta && (
            <Link href="/contact" className="live-cta mt-9">
              {cta}
            </Link>
          )}
        </div>
        {image && (
          <div className="relative mx-auto w-full max-w-[540px]">
            <Image
              src={image}
              alt={imageAlt}
              width={620}
              height={520}
              priority
              className="h-auto w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function TextSection({
  title,
  body,
  children,
  className = "",
}: {
  title: string;
  body?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`section-pad ${className}`}>
      <div className="site-container">
        <div className="max-w-[850px]">
          <h2 className="live-h2">{title}</h2>
          {body && <p className="mt-5 live-copy">{body}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function FeatureGrid({
  items,
  columns = "lg:grid-cols-3",
}: {
  items: { title: string; description: string; icon?: string }[];
  columns?: string;
}) {
  return (
    <div className={`mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 ${columns}`}>
      {items.map((item) => (
        <div key={item.title}>
          {item.icon && (
            <Image
              src={item.icon}
              alt=""
              width={58}
              height={58}
              className="mb-5 h-[58px] w-[58px]"
            />
          )}
          <h3 className="live-h3">{item.title}</h3>
          <p className="mt-3 live-copy">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function SplitImageSection({
  title,
  body,
  image,
  reverse = false,
  children,
}: {
  title: string;
  body: string;
  image?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="section-pad">
      <div
        className={`site-container grid items-center gap-14 md:grid-cols-2 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <h2 className="live-h2">{title}</h2>
          <p className="mt-5 live-copy">{body}</p>
          {children}
        </div>
        {image && (
          <Image
            src={image}
            alt=""
            width={580}
            height={460}
            className="h-auto w-full"
          />
        )}
      </div>
    </section>
  );
}

export function TechLogoCloud({
  logos = techLogos,
}: {
  logos?: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-3 md:grid-cols-5">
      {logos.map(([name, src]) => (
        <div key={`${name}-${src}`} className="flex flex-col items-center text-center">
          <Image src={src} alt={`${name} Logo`} width={78} height={78} className="h-[64px] w-[64px] object-contain" />
          <span className="mt-3 text-[15px] font-medium text-foreground">{name}</span>
        </div>
      ))}
    </div>
  );
}

export function ClientStories() {
  return (
    <section className="section-pad bg-white">
      <div className="site-container">
        <h2 className="live-h2">Who We&apos;ve Helped</h2>
        <p className="mt-4 max-w-[620px] live-copy">
          From construction and consultancy, to printing and engineering, we&apos;ve
          developed countless custom solutions for businesses like yours.
        </p>
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {clientStories.map((story) => (
            <article key={story.name} className="border-t border-[#dbe4f2] pt-7">
              <Image
                src={story.image}
                alt=""
                width={82}
                height={82}
                className="h-[72px] w-[72px] rounded-full object-cover"
              />
              <h3 className="mt-5 text-[18px] font-semibold text-foreground">
                {story.name}
              </h3>
              <p className="mt-1 text-[13px] leading-snug text-gray-text">
                {story.role}
              </p>
              <p className="mt-5 text-[14px] leading-relaxed text-gray-text">
                {story.quote}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      data-integrated-contact
      className="bg-[#20283b] py-[128px] text-[#d7deec]"
    >
      <div className="site-container grid items-center gap-16 lg:grid-cols-[1fr_360px]">
        <ContactForm variant="dark" />
        <aside className="flex flex-col items-start lg:pl-4">
          <Image
            src="/images/logo-symbol.svg"
            alt="Fishbulb Solutions"
            width={135}
            height={135}
            className="brightness-0 invert"
          />
          <a
            href="tel:0290031015"
            className="mt-16 text-[30px] font-light text-[#d7deec]"
          >
            Phone: 02 9003 1015
          </a>
          <p className="mt-7 text-[29px] font-light leading-tight text-[#8f9aba]">
            &copy; Fishbulb Solutions Pty Ltd
            <br />
            2022. All rights reserved.
          </p>
        </aside>
      </div>
    </section>
  );
}
