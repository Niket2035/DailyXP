import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Navbar from "@/components/common/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
