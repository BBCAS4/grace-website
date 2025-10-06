import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GRACE Integrated Health - Evidence-based care for older adults',
  description: 'GRACE (Geriatric Residential Aged Care Evaluations) provides modern, nurse practitioner‑led assessments and integrated care planning for residents, families, RACFs and GPs.',
  verification: {
    google: 't-kP7At1KFFh3tXk0uta-3YvhzAm9RwOMeiTZxCI-0Y',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
