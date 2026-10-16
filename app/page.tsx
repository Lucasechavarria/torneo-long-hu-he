import { TournamentHero } from "@/components/tournament-hero"
import { TournamentHeader } from "@/components/tournament-header"
import { TournamentInfo } from "@/components/tournament-info"
import { TournamentLocation } from "@/components/tournament-location"
import { TournamentFooter } from "@/components/tournament-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { TempleScrollytellingBackground } from "@/components/temple-scrollytelling-background"
import { ScrollProgress } from "@/components/scroll-progress"
import { InteractiveTournamentBracket } from "@/components/interactive-tournament-bracket"
import MartialArtsRegistrationForm from "@/components/martial-arts-registration-form"
import { SoundManager } from "@/components/sound-manager"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent relative text-foreground selection:bg-amber-500/30 selection:text-amber-200">
      <SoundManager />
      <TempleScrollytellingBackground />
      <AnimatedBackground />
      <ScrollProgress />
      <FloatingWhatsApp />
      <TournamentHeader />
      <main>
        <TournamentHero />
        <TournamentInfo />
        <TournamentLocation />

        <section id="registration" className="py-14 relative z-10 scroll-mt-20">
          <MartialArtsRegistrationForm />
        </section>

        <section className="py-14 bg-black/40 border-y border-amber-500/10 relative z-10">
          <InteractiveTournamentBracket />
        </section>
      </main>

      <TournamentFooter />
    </div>
  )
}


