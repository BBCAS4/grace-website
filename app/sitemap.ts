import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Use custom domain for production, fallback to Azure URL
  const baseUrl = 'https://graceintegratedhealth.com.au'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
