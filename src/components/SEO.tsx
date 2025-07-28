import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  siteName?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Beeylo',
  description = 'The new free inbox. No more spam, ads and useless updates.',
  keywords = 'email management, productivity, waitlist, early access, inbox organization, email client, competition, referral program',
  image = '/beeylo-og-image.jpg',
  url = 'https://beeylo.com',
  type = 'website',
  author = 'Beeylo Team',
  siteName = 'Beeylo'
}) => {
  const fullTitle = title.includes('Beeylo') ? title : `${title} | Beeylo`;
  const fullUrl = url.startsWith('http') ? url : `https://beeylo.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://beeylo.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@beeylo" />
      <meta name="twitter:creator" content="@beeylo" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content="Beeylo" />
      <meta name="apple-mobile-web-app-title" content="Beeylo" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Beeylo",
          "url": "https://beeylo.com",
          "logo": "https://beeylo.com/beeylo-logo.png",
          "description": "Smart email management platform that transforms your inbox into an organized, efficient workspace",
          "sameAs": [
            "https://twitter.com/beeylo",
            "https://linkedin.com/company/beeylo"
          ]
        })}
      </script>
      
      {/* Structured Data - WebApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Beeylo",
          "url": "https://beeylo.com",
          "description": "Smart email management platform with waitlist competition for early access",
          "applicationCategory": "ProductivityApplication",
          "operatingSystem": "Web, iOS, Android",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/ComingSoon"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;