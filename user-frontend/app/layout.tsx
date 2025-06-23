import type { Metadata } from "next";
import "./globals.css";
import AuthWrapper from "@/components/AuthWrapper";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "벨루나",
  description: "벨루나에 오신것을 환영합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>{children}</AuthWrapper>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
