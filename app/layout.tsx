import type { Metadata } from "'next'"
import { Inter } from "'next/font/google'"
import "'./globals.css'"
import { Layout } from "'@/components/layout'"

const inter = Inter({ subsets: ["'latin'"] })

export const metadata: Metadata = {
  title: "'PumpTok'",
  description: "'Share your workout videos'",
  viewport: "'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

