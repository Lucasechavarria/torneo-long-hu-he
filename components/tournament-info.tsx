"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
  Sword, 
  Shield, 
  Flame, 
  Target, 
  Sparkles, 
  Users, 
  Swords, 
  Wind,
  Trophy
} from "lucide-react"

const officialDisciplines = [
  {
    icon: Flame,
    title: "Formas",
    subtitle: "Mano Vacía Tradicional y Moderna",
    description: "Expresión técnica, equilibrio, potencia y marcialidad en estilos chinos, japoneses, coreanos e internacionales.",
    kanji: "拳",
    color: "from-amber-500 to-yellow-600",
  },
  {
    icon: Sword,
    title: "Formas con Armas",
    subtitle: "Armas Cortas, Largas y Especiales",
    description: "Manejo diestro de sable, espada recta, bastón, lanza, abanico y armas tradicionales de artes marciales.",
    kanji: "剑",
    color: "from-red-500 to-amber-600",
  },
  {
    icon: Target,
    title: "Point Fighting",
    subtitle: "Combate al Punto",
    description: "Velocidad de reacción, distancia, timing y control milimétrico con protecciones reglamentarias.",
    kanji: "点",
    color: "from-amber-400 to-red-600",
  },
  {
    icon: Swords,
    title: "Combate al Punto",
    subtitle: "Enfrentamiento Individual",
    description: "Estrategia marcial, puntuación limpia y respeto mutuo en el tatami bajo supervisión de jueces oficiales.",
    kanji: "战",
    color: "from-red-600 to-amber-500",
  },
  {
    icon: Sparkles,
    title: "Exhibición",
    subtitle: "Demostraciones Especiales",
    description: "aplicaciones técnicas y destrezas acrobáticas individuales o representativas de escuela.",
    kanji: "演",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Trophy,
    title: "Formas en Equipo",
    subtitle: "Sincronización Grupal",
    description: "Coordinación marcial impecable, ritmo uniforme y espíritu de conjunto en presentaciones grupales.",
    kanji: "阵",
    color: "from-yellow-500 to-red-600",
  },
  {
    icon: Users,
    title: "Combate por Equipos",
    subtitle: "Duelos entre Escuelas y Delegaciones",
    description: "Competencia por rondas acumulativas donde cada competidor defiende los colores y honor de su delegación.",
    kanji: "团",
    color: "from-red-500 to-rose-700",
  },
  {
    icon: Wind,
    title: "Tai Chi",
    subtitle: "Estilos Internos Tradicionales",
    description: "Fluidez, intención, respiración y enraizamiento en formas de mano vacía y armas internas (Yang, Chen, Wu, Sun).",
    kanji: "极",
    color: "from-amber-400 to-yellow-500",
  },
]

export function TournamentInfo() {
  return (
    <section id="disciplinas" className="py-16 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header with Plaque Ornament */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-8 py-2.5 plaque-banner mb-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.25em] text-[#FFF1B9] uppercase font-cinzel">
              Categorías / Disciplinas
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#FDFDFD]/80 font-montserrat max-w-xl mx-auto">
            Modalidades oficiales en competencia para la edición 2026. Abierto a practicantes de todas las escuelas federadas e independientes.
          </p>
        </div>

        {/* 8 Disciplines Interactive Grid with Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {officialDisciplines.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: (index % 4) * 0.08, duration: 0.45 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="h-full chinese-card-straight p-5 flex flex-col justify-between overflow-hidden relative group hover:border-[#FFF1B9] active:border-[#FFF1B9] active:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all cursor-pointer select-none">
                  {/* Watermark Chinese Character */}
                  <span className="absolute -top-3 -right-2 text-6xl font-yuji-boku text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-colors pointer-events-none select-none">
                    {item.kanji}
                  </span>

                  <div className="text-center pb-2 relative z-10">
                    {/* Red Circular Knot Emblem */}
                    <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-br from-[#C8102E] via-[#7A0010] to-black p-0.5 shadow-lg border border-[#D4AF37]/50 flex items-center justify-center group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-full bg-black/60 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#FFF1B9]" />
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-[#FDFDFD] group-hover:text-[#FFF1B9] transition-colors tracking-wide font-cinzel">
                      {item.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#D4AF37] tracking-wider uppercase font-montserrat mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="relative z-10 pt-2 font-montserrat">
                    <p className="text-xs text-[#FDFDFD]/75 text-center leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Accent line */}
                  <div className="mt-4 h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent group-hover:via-[#FFF1B9] group-active:via-[#FFF1B9] transition-colors" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Confraternidad Marcial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          whileTap={{ scale: 0.98 }}
          className="mt-14 text-center cursor-default select-none"
        >
          <div className="chinese-card-straight max-w-3xl mx-auto p-8 shadow-2xl relative overflow-hidden active:border-[#FFF1B9] transition-colors">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold block mb-2 font-cinzel">
              Confraternidad Marcial
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FDFDFD] mb-3 font-cinzel">
              ¡Torneo Abierto a Todas las Escuelas y Estilos!
            </h3>
            <p className="text-xs sm:text-sm text-[#FDFDFD]/80 max-w-2xl mx-auto leading-relaxed font-montserrat">
              Invitamos a participar a escuelas de Kung Fu, Karate, Taekwondo, Kickboxing, Tai Chi y todas las artes marciales hermanas. Una jornada única de competencia, integración y respeto marcial en el Club Alberdi de Burzaco.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

