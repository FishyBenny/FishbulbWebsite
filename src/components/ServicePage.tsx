import WebflowShell from "./WebflowShell";

// ---------------------------------------------------------------------------
// Data types — the skill generates objects matching this shape
// ---------------------------------------------------------------------------

export type ServicePageData = {
  meta: {
    title: string;
    description: string;
    slug: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaHref: string;
    imageSrc: string;
    imageAlt: string;
  };
  intro: {
    heading: string;
    paragraphs: string[];
    imageSrc?: string;
    imageAlt?: string;
  };
  features: {
    heading: string;
    subheading?: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  process: {
    heading: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  whyUs: {
    heading: string;
    description?: string;
    points: Array<{
      title: string;
      description: string;
    }>;
  };
  faq: {
    heading: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    heading: string;
    subheading: string;
    buttonText: string;
    buttonHref: string;
  };
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <WebflowShell>
      <HeroSection {...data.hero} />
      <IntroSection {...data.intro} />
      <FeaturesSection {...data.features} />
      <ProcessSection {...data.process} />
      <WhyUsSection {...data.whyUs} />
      <FaqSection {...data.faq} />
      <CtaSection {...data.cta} />
    </WebflowShell>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
}: ServicePageData["hero"]) {
  return (
    <section className="section_header26">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large2-2">
                <div className="header-hero2_component-2">
                  <div className="header-hero2_content">
                    <h1 className="heading-style-h1-2">{headline}</h1>
                    <p className="text-size-large-2">{subheadline}</p>
                    <div className="spacer-large hide-mobile-landscape hide-tablet">
                      <a href={ctaHref} className="w-button">
                        <strong>{ctaText}</strong>
                      </a>
                    </div>
                    <div className="spacer-large hide-mobile-landscape hide-tablet" />
                  </div>
                  <div className="header-hero2_image-wrapper">
                    <img
                      loading="lazy"
                      src={imageSrc}
                      alt={imageAlt}
                      className="header-aisolutions_image"
                    />
                  </div>
                  <div className="spacer-large" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroSection({
  heading,
  paragraphs,
  imageSrc,
  imageAlt,
}: ServicePageData["intro"]) {
  return (
    <section>
      <div className="padding-global">
        <div className="container-medium">
          <div className="padding-section-custom">
            <div className="header1_component">
              <div className="section-title-wrapper">
                <h2 className="heading-style-h2-2">{heading}</h2>
              </div>
              <div className="spacer-xlarge hide-mobile-landscape" />
              <div className="_2col-grid-2">
                <div className="basic-block-wrapper">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-size-regular-2">
                      {p}
                    </p>
                  ))}
                </div>
                {imageSrc && (
                  <div className="ai-agents-image-wrapper">
                    <img loading="lazy" alt={imageAlt ?? ""} src={imageSrc} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({
  heading,
  subheading,
  items,
}: ServicePageData["features"]) {
  return (
    <section>
      <div className="padding-global">
        <div className="container-medium">
          <div className="padding-section-small">
            <div className="header1_component">
              <div className="section-title-wrapper">
                <h2 className="heading-style-h2-3">{heading}</h2>
                {subheading && (
                  <p className="text-size-large-3">{subheading}</p>
                )}
              </div>
              <div className="spacer-large hide-mobile-landscape" />
              {/* Render features in rows of 2 */}
              {chunkArray(items, 2).map((row, rowIdx) => (
                <div key={rowIdx} className="tightbox-grid-2">
                  {row.map((item, colIdx) => (
                    <div key={colIdx} className="tightbox-gridcell">
                      <div className="heading-style-h4-2">{item.title}</div>
                      <div className="spacer-small" />
                      <p>{item.description}</p>
                      {colIdx === 0 && row.length > 1 && (
                        <div className="sketch-line-vertical right hide-mobile-landscape" />
                      )}
                    </div>
                  ))}
                  <div className="sketch-line-horizontal" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection({
  heading,
  steps,
}: ServicePageData["process"]) {
  return (
    <section>
      <div className="padding-global">
        <div className="container-small">
          <div className="padding-section-small">
            <div className="a_component">
              <div className="section-title-wrapper">
                <h2 className="heading-style-h2-4">{heading}</h2>
              </div>
              <div className="spacer-large hide-mobile-landscape" />
              {steps.map((step, i) => (
                <div key={i} className="_2col-grid-3">
                  {i % 2 === 0 ? (
                    <>
                      <div className="basic-block_image-wrapper">
                        <div
                          className="text-size-large-2"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            backgroundColor: "#f0f8fa",
                            color: "#078bd3",
                            fontSize: "3rem",
                            fontWeight: 700,
                            margin: "0 auto",
                          }}
                        >
                          {i + 1}
                        </div>
                      </div>
                      <div className="basic-block-wrapper">
                        <h3 className="heading-style-h3-2">{step.title}</h3>
                        <div className="spacer-xsmall" />
                        <p className="text-size-medium-2">{step.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="basic-block-wrapper">
                        <h3 className="heading-style-h3-2">{step.title}</h3>
                        <div className="spacer-xsmall" />
                        <p className="text-size-medium-2">{step.description}</p>
                      </div>
                      <div className="basic-block_image-wrapper">
                        <div
                          className="text-size-large-2"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            backgroundColor: "#f0f8fa",
                            color: "#078bd3",
                            fontSize: "3rem",
                            fontWeight: 700,
                            margin: "0 auto",
                          }}
                        >
                          {i + 1}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection({
  heading,
  description,
  points,
}: ServicePageData["whyUs"]) {
  return (
    <section>
      <div className="padding-global">
        <div className="container-medium">
          <div className="padding-section-large">
            <div className="pricing_component">
              <div className="pricing_heading-wrapper">
                <h2 className="heading-style-h2-5">{heading}</h2>
                <div className="rl_faq6_spacing-block-1" />
                {description && (
                  <p className="text-size-medium-3">{description}</p>
                )}
                <div className="rl_faq6_spacing-block-2" />
                <a href="/contact" className="button w-button">
                  Contact Us
                </a>
              </div>
              <div className="pricing_list">
                <div className="w-layout-grid pricing_list-grid">
                  {points.map((point, i) => (
                    <div key={i} className="pricing_accordion">
                      <div className="pricing_question">
                        <div className="heading-style-h6-3">{point.title}</div>
                      </div>
                      <div
                        className="pricing_answer-wrapper"
                        style={{ height: "auto" }}
                      >
                        <div className="pricing_answer">
                          <p className="text-size-regular-2">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ heading, items }: ServicePageData["faq"]) {
  return (
    <section>
      <div className="padding-global">
        <div className="container-medium">
          <div className="padding-section-medium">
            <div className="section-title-wrapper">
              <h2 className="heading-style-h2-2">{heading}</h2>
            </div>
            <div className="spacer-large" />
            <div className="w-layout-vflex" style={{ gap: "1rem" }}>
              {items.map((item, i) => (
                <details
                  key={i}
                  className="pricing_accordion"
                  style={{ cursor: "pointer" }}
                >
                  <summary className="pricing_question">
                    <div className="heading-style-h6-3">{item.question}</div>
                  </summary>
                  <div className="pricing_answer-wrapper">
                    <div className="pricing_answer">
                      <p className="text-size-regular-2">{item.answer}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection({
  heading,
  subheading,
  buttonText,
  buttonHref,
}: ServicePageData["cta"]) {
  return (
    <section>
      <div className="padding-global">
        <div className="container-medium">
          <div
            className="padding-section-large"
            style={{ textAlign: "center" }}
          >
            <h2 className="heading-style-h2-2">{heading}</h2>
            <div className="spacer-small" />
            <p className="text-size-large-2">{subheading}</p>
            <div className="spacer-large" />
            <a href={buttonHref} className="button is-large w-button">
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
