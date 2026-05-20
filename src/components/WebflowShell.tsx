import {
  getPageAssets,
  rewriteContent,
  buildRuntimeScript,
  safeScriptJson,
} from "@/lib/webflow";

/**
 * Donor page used to extract the Webflow nav, footer, CSS, and scripts.
 * The AI automations page is ideal because its stylesheet includes the full
 * set of utility classes needed by native ServicePage components.
 */
const DONOR_PATH = "/services/ai-automations";

type WebflowShellProps = {
  children: React.ReactNode;
};

/**
 * Wraps native (non-mirrored) pages in the live Webflow site chrome — navbar,
 * footer, stylesheets, and runtime scripts — so they look identical to
 * Webflow-mirrored pages.
 *
 * Fetches the donor page with ISR and extracts the HTML before `<main>` (nav)
 * and after `</main>` (footer), then renders children in between.
 */
export default async function WebflowShell({ children }: WebflowShellProps) {
  const assets = await getPageAssets(DONOR_PATH);

  const { navHtml, footerHtml } = extractShellParts(assets.body);

  return (
    <>
      {assets.preconnects.map((href) => (
        <link key={href} href={href} rel="preconnect" crossOrigin="anonymous" />
      ))}
      {assets.stylesheetHrefs.map((href) => (
        <link key={href} href={href} rel="stylesheet" type="text/css" />
      ))}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.setAttribute("data-wf-domain", "www.fishbulbsolutions.com.au");
            document.documentElement.setAttribute("data-wf-page", ${JSON.stringify(assets.htmlAttrs["data-wf-page"] ?? "")});
            document.documentElement.setAttribute("data-wf-site", ${JSON.stringify(assets.htmlAttrs["data-wf-site"] ?? "")});
            document.documentElement.setAttribute("lang", "en");
            if (!document.documentElement.className.includes("w-mod-js")) {
              document.documentElement.className += " w-mod-js";
            }
            if (("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch) && !document.documentElement.className.includes("w-mod-touch")) {
              document.documentElement.className += " w-mod-touch";
            }
          `,
        }}
      />

      {/* Webflow nav chrome */}
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: navHtml }}
      />

      {/* Native page content */}
      <main>{children}</main>

      {/* Webflow footer chrome */}
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: footerHtml }}
      />

      {/* Fix active nav state for the current page */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var links = document.querySelectorAll(".rl_navbar5_dropdown-link, .navlink");
              var current = window.location.pathname.replace(/\\/$/, "") || "/";
              links.forEach(function (link) {
                link.classList.remove("w--current");
                link.removeAttribute("aria-current");
                var href = (link.getAttribute("href") || "").replace(/\\/$/, "") || "/";
                if (href === current) {
                  link.classList.add("w--current");
                  link.setAttribute("aria-current", "page");
                }
              });
            }());
          `,
        }}
      />

      {assets.inlineBodyScripts.map((script, index) => (
        <script
          key={`inline-body-${index}`}
          dangerouslySetInnerHTML={{ __html: script }}
        />
      ))}
      <script dangerouslySetInnerHTML={{ __html: buildRuntimeScript(assets) }} />
    </>
  );
}

/**
 * Split the Webflow body HTML into the nav chrome (everything before `<main>`)
 * and the footer chrome (everything after `</main>`).
 */
function extractShellParts(body: string) {
  const mainStart = body.search(/<main[\s>]/i);
  const mainEndTag = "</main>";
  const mainEndIndex = body.indexOf(mainEndTag);

  const navHtml =
    mainStart >= 0 ? rewriteContent(body.slice(0, mainStart)) : "";
  const footerHtml =
    mainEndIndex >= 0
      ? rewriteContent(body.slice(mainEndIndex + mainEndTag.length))
      : "";

  return { navHtml, footerHtml };
}
