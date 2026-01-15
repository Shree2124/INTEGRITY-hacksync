import { FooterSection } from "@/components/LandingPage/FooterSection";
import SiteHeader from "@/components/layouts/SiteHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        {children}
      </main>
      <FooterSection />
    </div>
  );
}
