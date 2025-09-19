import { TournamentHero } from "@/components/tournament-hero"
import { TournamentHeader } from "@/components/tournament-header"
import { TournamentInfo } from "@/components/tournament-info"
import { TournamentFooter } from "@/components/tournament-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { ScrollProgress } from "@/components/scroll-progress"
import { InteractiveTournamentBracket } from "@/components/interactive-tournament-bracket"
import MartialArtsRegistrationForm from "@/components/martial-arts-registration-form"
import { SoundManager } from "@/components/sound-manager"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <SoundManager />
      <AnimatedBackground />
      <ScrollProgress />
      <TournamentHeader />
      <TournamentHero />
      <TournamentInfo />

      <section id="registration" className="py-20">
        <MartialArtsRegistrationForm />
      </section>

      <section className="py-20 bg-gray-900/30">
        <InteractiveTournamentBracket />
      </section>

      <TournamentFooter />
    </div>
  )
}
