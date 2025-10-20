import { MetadataRoute } from 'next';

export function generateStructuredData() {
  const baseUrl = 'https://graceintegratedhealth.com.au';
  
  const organization = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "GRACE Integrated Health",
    "alternateName": "GRACE",
    "description": "Geriatric Residential Aged Care Evaluations - Nurse practitioner-led assessments and integrated care planning for residential aged care facilities.",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/og-image.jpg`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Port Macquarie",
      "addressRegion": "NSW",
      "addressCountry": "AU"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+61-433-778-876",
        "contactType": "customer service",
        "areaServed": "AU",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "email": "NP@GRACEIntegratedHealth.com.au",
        "contactType": "customer service",
        "areaServed": "AU",
        "availableLanguage": "English"
      }
    ],
    "sameAs": [],
    "foundingDate": "2024",
    "numberOfEmployees": "1-10",
    "medicalSpecialty": [
      "Geriatric Medicine",
      "Nurse practitioner Services",
      "Aged Care",
      "Chronic Disease Management"
    ],
    "serviceType": [
      "Health Assessment",
      "Medication Review",
      "Chronic Disease Management",
      "Behaviour Support",
      "Residential Aged Care Evaluations"
    ]
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    "name": "Geriatric Residential Aged Care Evaluations",
    "description": "Comprehensive Nurse practitioner-led health assessments and care planning for residents in aged care facilities.",
    "provider": {
      "@type": "MedicalOrganization",
      "name": "GRACE Integrated Health"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${baseUrl}/contact`,
      "serviceName": "Contact Form"
    },
    "offers": {
      "@type": "Offer",
      "description": "Professional aged care health assessments and medication reviews",
      "category": "Healthcare Services"
    }
  };

  const healthProfessional = {
    "@context": "https://schema.org",
    "@type": "Nurse",
    "name": "GRACE Integrated Health Nurse practitioner",
    "worksFor": {
      "@type": "MedicalOrganization",
      "name": "GRACE Integrated Health"
    },
    "medicalSpecialty": "Geriatric Medicine",
    "areaServed": "Australia",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "NP@GRACEIntegratedHealth.com.au",
      "telephone": "+61-433-778-876"
    }
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GRACE Integrated Health",
    "url": baseUrl,
    "description": "Evidence-based, Nurse practitioner-led care for older adults in residential aged care facilities.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/contact?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GRACE Integrated Health"
    }
  };

  return [organization, service, healthProfessional, website];
}

export function StructuredDataScript() {
  const structuredData = generateStructuredData();
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
