import { Metadata } from "next";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { LandingHero } from "@/features/landing/components/LandingHero";
import { RealtimeFeatureSection } from "@/features/landing/components/RealtimeFeatureSection";
import { SearchFeatureSection } from "@/features/landing/components/SearchFeatureSection";
import { GroupFeatureSection } from "@/features/landing/components/GroupFeatureSection";
import { HowItWorksSection } from "@/features/landing/components/HowItWorksSection";
import { InteractiveDemoSection } from "@/features/landing/components/InteractiveDemoSection";
import { LandingCtaFooter } from "@/features/landing/components/LandingCtaFooter";

export const metadata: Metadata = {
  title: "Taghyeer Chat — Real conversations. Without the waiting.",
  description:
    "Enterprise real-time 1-to-1 and group chat application built with Next.js App Router, Socket.io, and Tailwind CSS.",
  openGraph: {
    title: "Taghyeer Chat — Real conversations. Without the waiting.",
    description:
      "Enterprise real-time 1-to-1 and group chat application with zero page reloads.",
  },
};

/**
 * Root Landing Page Component (Server Component).
 * Showcase experience for Taghyeer Chat product features.
 */
export default function RootPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-purple-500/30">
      <LandingNavbar />
      <main>
        <LandingHero />
        <RealtimeFeatureSection />
        <SearchFeatureSection />
        <GroupFeatureSection />
        <HowItWorksSection />
        <InteractiveDemoSection />
        <LandingCtaFooter />
      </main>
    </div>
  );
}
