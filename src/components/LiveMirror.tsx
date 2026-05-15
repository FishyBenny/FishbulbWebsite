const LIVE_ORIGIN = "https://www.fishbulbsolutions.com.au";

type LiveMirrorProps = {
  path: string;
};

type PageAssets = {
  body: string;
  description: string;
  htmlAttrs: Record<string, string>;
  inlineBodyScripts: string[];
  inlineHeadScripts: string[];
  preconnects: string[];
  scriptSrcs: string[];
  stylesheetHrefs: string[];
  title: string;
};

export async function getLiveMetadata(path: string) {
  const assets = extractPageAssets(await fetchLiveHtml(path));

  return {
    title: assets.title,
    description: assets.description,
    openGraph: {
      title: assets.title,
      description: assets.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: assets.title,
      description: assets.description,
    },
  };
}

export default async function LiveMirror({ path }: LiveMirrorProps) {
  const assets = extractPageAssets(await fetchLiveHtml(path));

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
            document.title = ${JSON.stringify(assets.title)};
            if (!document.documentElement.className.includes("w-mod-js")) {
              document.documentElement.className += " w-mod-js";
            }
            if (("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch) && !document.documentElement.className.includes("w-mod-touch")) {
              document.documentElement.className += " w-mod-touch";
            }
          `,
        }}
      />
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: rewriteLinks(assets.body) }}
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

function extractPageAssets(html: string): PageAssets {
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
    htmlAttrs,
    inlineBodyScripts,
    inlineHeadScripts,
    preconnects: extractHrefs(head, /<link\b(?=[^>]*rel="preconnect")[^>]*>/gi),
    scriptSrcs: Array.from(new Set(scriptSrcs)),
    stylesheetHrefs: extractHrefs(head, /<link\b(?=[^>]*rel="stylesheet")[^>]*>/gi),
    title,
  };
}

async function fetchLiveHtml(path: string) {
  const livePath = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
  const response = await fetch(`${LIVE_ORIGIN}${livePath}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch live Fishbulb page: ${livePath}`);
  }

  return response.text();
}

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

function rewriteLinks(markup: string) {
  return markup
    .replaceAll(`${LIVE_ORIGIN}/`, "/")
    .replaceAll(`${LIVE_ORIGIN}"`, '/"')
    .replaceAll("https://fishbulb.com.au/", "/")
    .replaceAll("https://fishbulb.com.au\"", '/"')
    .replace(
      /<div[^>]*class="[^"]*\bg-recaptcha\b[^"]*"[^>]*><\/div>/gi,
      `<div class="w-form-formrecaptcha fishbulb-recaptcha-shell"><div class="fishbulb-recaptcha-mock" aria-hidden="true"><div class="fishbulb-recaptcha-checkline"><span class="fishbulb-recaptcha-checkbox"></span><span>I'm not a robot</span></div><div class="fishbulb-recaptcha-brand"><img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="" /><span>reCAPTCHA</span></div></div></div>`
    );
}

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"');
}

function buildRuntimeScript(assets: PageAssets) {
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

function safeScriptJson(value: unknown) {
  return JSON.stringify(value).replaceAll("</script", "<\\/script");
}
