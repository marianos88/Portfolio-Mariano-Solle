import Script from 'next/script'

// Server-only env var — read at runtime, not baked in at build time.
// Do NOT prefix with NEXT_PUBLIC_: the GTM ID is only ever used server-side,
// and NEXT_PUBLIC_ vars are inlined by webpack at build time, making them
// undefined forever if the variable was not set when `next build` ran.
const GTM_ID = process.env.GTM_ID

// True only on the live Vercel deployment.
// VERCEL_ENV === 'preview' (preview deployments) is explicitly excluded.
// Fallback to NODE_ENV for local production builds where VERCEL_ENV is unset.
const isLiveProduction =
  process.env.VERCEL_ENV === 'production' ||
  (process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV)

/**
 * Injects the GTM container script and noscript fallback.
 * Renders nothing when GTM_ID is unset or not on the live site.
 * Preview deployments are intentionally excluded to keep production metrics clean.
 * Place as the first child of <body> in the root layout.
 */
export function GtmScript() {
  if (!GTM_ID || !isLiveProduction) return null

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
