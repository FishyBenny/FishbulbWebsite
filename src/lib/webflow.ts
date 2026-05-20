import { notFound } from "next/navigation";

export const SITE_URL = "https://www.fishbulbsolutions.com.au";

/** Revalidate mirrored pages every 120 seconds instead of fetching on every request. */
export const REVALIDATE_SECONDS = 120;

export type PageAssets = {
  body: string;
  description: string;
  hasFooter: boolean;
  htmlAttrs: Record<string, string>;
  inlineBodyScripts: string[];
  inlineHeadScripts: string[];
  preconnects: string[];
  scriptSrcs: string[];
  stylesheetHrefs: string[];
  title: string;
};

/**
 * Fetch and parse a live Webflow page, shared between metadata and rendering
 * so each page only makes one request per revalidation cycle.
 */
export async function getPageAssets(path: string) {
  return extractPageAssets(await fetchLiveHtml(path));
}

export function extractPageAssets(html: string): PageAssets {
  const htmlAttrs = parseAttrs(html.match(/<html\s+([^>]*)>/i)?.[1] ?? "");
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const rawBody = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  const title = decodeHtml(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = decodeHtml(
    extractMetaContent(head, "name", "description") ??
      extractMetaContent(head, "property", "og:description") ??
      ""
  );
  const headScripts = head.match(/<script\b(?:(?!<\/script>)[\s\S])*<\/script>/gi) ?? [];
  const bodyScripts = rawBody.match(/<script\b(?:(?!<\/script>)[\s\S])*<\/script>/gi) ?? [];
  const scriptSrcs = [...headScripts, ...bodyScripts]
    .map((script) => script.match(/\ssrc="([^"]+)"/i)?.[1])
    .filter((src): src is string => Boolean(src))
    .filter(
      (src) =>
        src.includes("webfont") ||
        src.includes("jquery") ||
        src.includes("webflow") ||
        src.includes("typed")
    );
  const inlineHeadScripts = headScripts
    .filter((script) => !script.match(/\ssrc=/i))
    .map((script) => script.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, ""))
    .filter((script) => script.includes("WebFont.load"));
  const inlineBodyScripts = bodyScripts
    .filter((script) => !script.match(/\ssrc=/i))
    .map((script) => script.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, ""))
    .map(normalizeInlineBodyScript)
    .filter((script) => script.trim().length > 0);

  return {
    body: rawBody.replace(/<script\b(?:(?!<\/script>)[\s\S])*<\/script>/gi, ""),
    description,
    hasFooter: /<footer\b/i.test(rawBody),
    htmlAttrs,
    inlineBodyScripts,
    inlineHeadScripts,
    preconnects: extractHrefs(head, /<link\b(?=[^>]*rel="preconnect")[^>]*>/gi),
    scriptSrcs: Array.from(new Set(scriptSrcs)),
    stylesheetHrefs: extractHrefs(head, /<link\b(?=[^>]*rel="stylesheet")[^>]*>/gi),
    title,
  };
}

export async function fetchLiveHtml(path: string) {
  const livePath = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
  const response = await fetch(`${SITE_URL}${livePath}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch live Fishbulb page: ${livePath}`);
  }

  return response.text();
}

export function rewriteContent(markup: string) {
  return markup
    .replaceAll(`${SITE_URL}/`, "/")
    .replaceAll(`${SITE_URL}"`, '/"')
    .replaceAll("https://fishbulb.com.au/", "/")
    .replaceAll("https://fishbulb.com.au\"", '/"')
    .replace(
      /<div[^>]*class="[^"]*\bg-recaptcha\b[^"]*"[^>]*><\/div>/gi,
      `<div class="w-form-formrecaptcha fishbulb-recaptcha-shell"><div class="fishbulb-recaptcha-mock" aria-hidden="true"><div class="fishbulb-recaptcha-checkline"><span class="fishbulb-recaptcha-checkbox"></span><span>I'm not a robot</span></div><div class="fishbulb-recaptcha-brand"><img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="" /><span>reCAPTCHA</span></div></div></div>`
    )
    .replaceAll("incedible", "incredible")
    .replaceAll("NickAmiradaki", "Nick Amiradaki")
    .replaceAll("Designs that reflects", "Designs that reflect")
    .replaceAll("automations dramatically increases", "automations dramatically increase")
    .replaceAll(
      "© Fishbulb Solutions Pty Ltd 2022",
      `© Fishbulb Solutions Pty Ltd ${new Date().getFullYear()}`
    );
}

export function buildRuntimeScript(assets: PageAssets) {
  return `
    (function () {
      var scriptSrcs = ${safeScriptJson(assets.scriptSrcs)};
      var inlineHeadScripts = ${safeScriptJson(assets.inlineHeadScripts)};

      function runInline(scriptText) {
        try {
          (0, eval)(scriptText);
        } catch (error) {
          console.error("Fishbulb mirror inline script failed", error);
        }
      }

      function loadScript(src) {
        return new Promise(function (resolve) {
          if (document.querySelector('script[data-fishbulb-src="' + src + '"]')) {
            resolve();
            return;
          }

          var script = document.createElement("script");
          script.src = src;
          script.type = "text/javascript";
          script.setAttribute("data-fishbulb-src", src);
          script.onload = resolve;
          script.onerror = resolve;
          document.body.appendChild(script);
        });
      }

      scriptSrcs.reduce(function (chain, src) {
        return chain.then(function () {
          return loadScript(src);
        }).then(function () {
          if (src.indexOf("webfont") !== -1) {
            inlineHeadScripts.forEach(runInline);
            inlineHeadScripts = [];
          }
        });
      }, Promise.resolve()).then(function () {
        inlineHeadScripts.forEach(runInline);
      });
    }());
  `;
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

function extractHrefs(source: string, pattern: RegExp) {
  return (source.match(pattern) ?? [])
    .map((tag) => tag.match(/\shref="([^"]+)"/i)?.[1])
    .filter((href): href is string => Boolean(href));
}

function extractMetaContent(source: string, attr: "name" | "property", value: string) {
  const tags = source.match(/<meta\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => readTagAttribute(candidate, attr) === value);
  return tag ? readTagAttribute(tag, "content") : undefined;
}

function readTagAttribute(tag: string, attributeName: string) {
  return tag.match(new RegExp(`\\s${attributeName}="([^"]*)"`, "i"))?.[1];
}

function normalizeInlineBodyScript(script: string) {
  return script.replace(
    '  const toggleButton = document.getElementById("toggle-hp");\n',
    '  const toggleButton = document.getElementById("toggle-hp");\n\n  if (!form || !submitButton || !honeypotInput) return;\n'
  );
}

function parseAttrs(attrs: string) {
  const parsed: Record<string, string> = {};
  for (const match of attrs.matchAll(/([:\w-]+)="([^"]*)"/g)) {
    parsed[match[1]] = match[2];
  }
  return parsed;
}

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"');
}

export function safeScriptJson(value: unknown) {
  return JSON.stringify(value).replaceAll("</script", "<\\/script");
}
