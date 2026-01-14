'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/auth/LoadingScreen';
import { EmailVerificationBanner } from '@/components/auth/EmailVerificationBanner';
import { FooterSection } from "@/components/LandingPage/FooterSection";
import SiteHeader from "@/components/layouts/SiteHeader";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, emailVerified, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User not authenticated, redirect to login with return URL
        router.replace(`/login?redirect=${pathname}`);
      } else if (!emailVerified) {
        // User authenticated but email not verified
        router.replace('/verify-email');
      }
    }
  }, [user, emailVerified, loading, router, pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  // If no user or email not verified, don't render (redirect handles it)
  if (!user || !emailVerified) {
    return null;
  }

  return (
    <>
      <EmailVerificationBanner />
      <SiteHeader user={user} />
      {children}
      <FooterSection />
    </>
  );
}
