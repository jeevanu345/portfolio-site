import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function MetaTags() {
  const { asPath, pathname } = useRouter();
  const siteUrl = 'https://jeevanu.com';
  const pagePath = asPath.split(/[?#]/)[0];
  const canonical = `${siteUrl}${pagePath === '/' ? '/' : pagePath.replace(/\/$/, '')}`;
  const isHome = pathname === '/';
  const title =
    pathname === '/projects'
      ? 'Projects | Jeevan U'
      : 'Jeevan U (JWEINU) | Developer Portfolio';
  const description =
    pathname === '/projects'
      ? 'Explore Jeevan U’s software projects in full-stack development, AI/ML, distributed systems, RAG, and IoT.'
      : 'Jeevan U, also known as JWEINU (Jeevan U Gowda). Full-stack developer and AI/ML enthusiast in Bengaluru. Explore my projects at jeevanu.com.';
  const indexable = isHome || pathname === '/projects';
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Jeevan U',
        alternateName: [
          'JWEINU',
          'Jeevan U Gowda',
          'Jeevan Gowda',
          'jeevanu345',
        ],
        url: `${siteUrl}/`,
        sameAs: [
          'https://github.com/jeevanu345',
          'https://www.linkedin.com/in/jeevanu345/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Jeevan U',
        alternateName: ['JWEINU', 'Jeevan U Gowda', 'jeevanu.com'],
        url: `${siteUrl}/`,
        author: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profile`,
        url: `${siteUrl}/`,
        name: title,
        mainEntity: { '@id': `${siteUrl}/#person` },
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
    ],
  };

  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/meta/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/meta/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/meta/favicon-16x16.png"
      />
      <link rel="manifest" href="/meta/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/meta/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#162447" />

      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content="Jeevan U (Jeevan U Gowda, jeevanu345)" />
      <meta
        name="keywords"
        content="Jeevan U, JWEINU, jeevanu345, jeevan u gowda portfolio, jeevan gowda, full stack developer, AI ML engineer, BMSCE, information science, raftkv, RAG, IoT projects"
      />
      <meta
        name="robots"
        content={indexable ? 'index, follow' : 'noindex, follow'}
      />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Jeevan U" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${siteUrl}/meta/meta-social-image.png`}
      />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:site" content="jeevanu345" />
      <meta name="twitter:creator" content="jeevanu345" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={`${siteUrl}/meta/meta-social-image.png`}
      />
      {isHome && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </Head>
  );
}
