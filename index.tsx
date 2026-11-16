import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ImpactCarousel } from "@/components/site/ImpactCarousel";
import { StorySection } from "@/components/site/StorySection";
import { PurposeSection } from "@/components/site/PurposeSection";
import { ImpactTiers } from "@/components/site/ImpactTiers";
import { PixDonation } from "@/components/site/PixDonation";
import { CommunitySection, LocationSection } from "@/components/site/CommunityLocation";
import { DEFAULT_AMOUNT } from "@/lib/donation";

const TITLE = "Abrigo Resgaute — Doe via PIX e salve vidas";
const DESCRIPTION =
  "Conheça o Abrigo Resgaute, ONG de resgate animal com mais de 500 animais acolhidos. Ajude a salvar vidas com sua doação via PIX.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  const [preset, setPreset] = useState<number | null>(DEFAULT_AMOUNT);
  const [custom, setCustom] = useState("");

  const pickFromTier = (amount: number) => {
    setPreset(amount);
    setCustom("");
    document.getElementById("como-doar-pix")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="topo" className="min-h-screen bg-background">
      <SiteHeader />
      <main className="overflow-x-clip py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] space-y-20 px-4 sm:px-6 lg:space-y-28 lg:px-8">
          <ImpactCarousel />
          <StorySection />
          <PurposeSection />
          <ImpactTiers onPick={pickFromTier} />
          <PixDonation
            preset={preset}
            custom={custom}
            onPresetChange={(v) => {
              setPreset(v);
              setCustom("");
            }}
            onCustomChange={setCustom}
          />
          <CommunitySection />
          <LocationSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
