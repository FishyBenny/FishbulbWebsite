import {
  SITE_URL,
  getPageAssets,
  rewriteContent,
  buildRuntimeScript,
} from "@/lib/webflow";

type LiveMirrorProps = {
  path: string;
};

export async function getLiveMetadata(path: string) {
  const assets = await getPageAssets(path);
  const canonicalUrl = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title: assets.title,
    description: assets.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: assets.title,
      description: assets.description,
      url: canonicalUrl,
      siteName: "Fishbulb Solutions",
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
  const assets = await getPageAssets(path);

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
        dangerouslySetInnerHTML={{ __html: rewriteContent(assets.body) }}
      />
      {!assets.hasFooter && (
        <footer className="footer" style={{ paddingBottom: "40px" }}>
          <div className="container-medium">
            <div className="padding-global">
              <div className="wrapper__footer-main">
                <div className="wrapper__footer-logo-details">
                  <img
                    src="https://cdn.prod.website-files.com/655d6e5fca24f94d1e6b2a27/655edfc109e863ce99ac2f2c_Image-logo-symbol.svg"
                    loading="lazy"
                    width="119"
                    alt=""
                    className="image-3"
                  />
                  <div className="text__footer-phonenumber">
                    Phone: 02 9003 1015
                  </div>
                  <div className="text__footer-notes">
                    &copy; Fishbulb Solutions Pty Ltd{" "}
                    {new Date().getFullYear()}. All rights reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
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
