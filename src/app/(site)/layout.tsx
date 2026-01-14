import { FooterSection } from "@/components/LandingPage/FooterSection";
import SiteHeader from "@/components/layouts/SiteHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <body
      >
        <SiteHeader/>
        {children}
        <FooterSection/>
      </body>
  );
}
