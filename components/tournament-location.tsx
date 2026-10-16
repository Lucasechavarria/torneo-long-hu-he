"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, Phone, Calendar, Clock, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TournamentLocation() {
  const addressQuery = encodeURIComponent("Club Alberdi, Int. C. Amenedo 280, Burzaco, Provincia de Buenos Aires, Argentina")
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`

  return (
    <section id="sede" className="py-16 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-5xl">
        {/* Section Plaque */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-8 py-2.5 plaque-banner mb-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.25em] text-[#FFF1B9] uppercase font-cinzel">
              Sede Oficial del Evento
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#FDFDFD]/80 font-montserrat max-w-2xl mx-auto">
            El encuentro se llevará a cabo en las amplias instalaciones del Club Alberdi de Burzaco.
          </p>
        </div>

        {/* Main Location Card */}
        <div className="chinese-card-straight p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Venue Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#7A0010] border border-[#D4AF37] text-[11px] font-bold text-[#FFF1B9] tracking-widest uppercase font-cinzel">
                  Sede Oficial 2026
                </span>
                <span className="text-xs text-[#D4AF37] font-montserrat font-medium">Burzaco, Buenos Aires</span>
              </div>

              <div>
                {/* Traditional Pagoda Icon from Flyer */}
                <div className="mb-2 flex items-center gap-2 text-[#D4AF37]">
                  <Landmark className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-xs font-bold tracking-widest uppercase font-cinzel text-[#FFF1B9]">Estadio Principal</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold gold-metallic-text tracking-wide font-cinzel mb-2">
                  Club Alberdi de Burzaco
                </h3>
                <p className="text-base sm:text-lg text-[#FDFDFD] font-medium flex items-center gap-2 font-montserrat">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  Int. C. Amenedo 280 — Burzaco
                </p>
                <p className="text-sm text-[#FDFDFD]/75 ml-7 font-montserrat">
                  Provincia de Buenos Aires, República Argentina
                </p>
              </div>

              {/* Event Time Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-montserrat">
                <div className="p-4 bg-black/80 border border-[#D4AF37]/30">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <span className="text-[10px] text-[#D4AF37] block font-semibold uppercase tracking-wider">Fecha Oficial</span>
                      <span className="text-sm font-bold text-[#FDFDFD]">Domingo 22 Noviembre 2026</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/80 border border-[#D4AF37]/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <span className="text-[10px] text-[#D4AF37] block font-semibold uppercase tracking-wider">Acreditación & Inicio</span>
                      <span className="text-sm font-bold text-[#FDFDFD]">Apertura: 10:00 hs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flyer Motto Quote */}
              <div className="p-4 bg-black/60 border-l-2 border-[#D4AF37] text-xs sm:text-sm text-[#FFF1B9] italic font-montserrat">
                "Con honor, respeto y espíritu marcial, los esperamos para compartir juntos este encuentro."
                <div className="mt-1 font-cinzel not-italic text-[11px] text-[#D4AF37] uppercase tracking-wider font-bold">
                  Asociación Long Hu He · Kung Fu Shaolin — Taijiquan
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="btn-martial-primary px-6 py-3 cursor-pointer shadow-xl flex items-center gap-2">
                    <Navigation className="w-4 h-4 mr-1" />
                    Cómo Llegar en Google Maps
                  </Button>
                </a>

                <a
                  href="https://wa.me/541168774097?text=Hola,%20quisiera%20consultar%20sobre%20el%20Torneo%20Abierto%20de%20Artes%20Marciales%202026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="btn-martial-secondary px-6 py-3 cursor-pointer flex items-center gap-2">
                    <Phone className="w-4 h-4 mr-1 text-[#D4AF37]" />
                    Contacto WhatsApp: 11 6877-4097
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Map Preview Card */}
            <div className="lg:col-span-5 flex flex-col h-full">
              <div className="overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black/90 relative group flex-1 w-full min-h-[320px] sm:min-h-[380px]">
                {/* Map iframe for Int. C. Amenedo 280, Burzaco */}
                <iframe
                  title="Ubicación Club Alberdi de Burzaco"
                  src="https://maps.google.com/maps?q=Int.+C.+Amenedo+280,+Burzaco,+Provincia+de+Buenos+Aires&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-125 brightness-90 grayscale-[20%]"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute inset-0 pointer-events-none border border-[#D4AF37]/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
