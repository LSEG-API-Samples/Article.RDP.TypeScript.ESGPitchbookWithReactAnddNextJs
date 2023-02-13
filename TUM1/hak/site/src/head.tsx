import Head from "next/head";

export function SEO({ path }: { path?: string }) {
  return (
    <Head>
      <title>Refinitiv Hackathon - TUM TEAM 1</title>

      <meta property="og:title" content="Refinitiv Hackathon - TUM TEAM 1" />
      <meta property="og:site_name" content="refinitiv hackathon" />
      <meta
        property="og:url"
        content={path || `https://refinitiv-hackathon.vercel.app`}
      />
      <meta property="og:description" content="Refinitiv Hackathon" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://refinitiv-hackathon.vercel.app/og-image.png"
      />
    </Head>
  );
}
