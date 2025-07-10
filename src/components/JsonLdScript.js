'use client';

import Script from 'next/script';

export default function JsonLdScript({ jsonld }) {
  if (!jsonld) return null;

  return (
    <Script
      id="jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
    />
  );
}
