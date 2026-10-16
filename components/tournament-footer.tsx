import Image from "next/image"
import { Instagram, Phone, MapPin, Calendar, Clock, ExternalLink } from "lucide-react"

export function TournamentFooter() {
  return (
    <footer className="bg-[#050505] border-t border-[#D4AF37]/30 py-16 relative overflow-hidden">
      {/* Decorative top gold gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      {/* Traditional Red Chop Stamp Watermark in bottom corner */}
      <div className="absolute -bottom-6 right-8 opacity-20 pointer-events-none select-none hidden md:block">
        <div className="hanko-stamp-large text-2xl font-yuji-boku p-3">
          <span>廉潔</span>
          <br />
          <span>忠義</span>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left mb-12">
          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#FFF1B9] tracking-wider uppercase font-cinzel flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              Contacto Directo
            </h4>
            <div className="space-y-3 text-sm font-montserrat">
              <a
                href="https://wa.me/541168774097?text=Hola,%20quisiera%20consultar%20sobre%20el%20Torneo%20Abierto%202026"
                className="flex items-center justify-center md:justify-start gap-2.5 text-[#FDFDFD]/80 hover:text-[#FFF1B9] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-8 h-8 rounded-none bg-[#7A0010] border border-[#D4AF37] flex items-center justify-center text-[#FFF1B9]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-[#FDFDFD]">WhatsApp Oficial</span>
                  <span className="text-xs text-[#D4AF37]">11 6877-4097</span>
                </div>
              </a>
              <a
                href="https://instagram.com/longhuhe_kungfu"
                className="flex items-center justify-center md:justify-start gap-2.5 text-[#FDFDFD]/80 hover:text-[#FFF1B9] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-8 h-8 rounded-none bg-black border border-[#D4AF37]/50 flex items-center justify-center text-[#FFF1B9]">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-[#FDFDFD]">Instagram</span>
                  <span className="text-xs text-[#D4AF37]">@longhuhe_kungfu</span>
                </div>
              </a>
            </div>
          </div>

          {/* Ubicación */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#FFF1B9] tracking-wider uppercase font-cinzel flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              Sede Oficial
            </h4>
            <div className="flex items-start justify-center md:justify-start gap-3 text-sm text-[#FDFDFD]/80 font-montserrat">
              <div className="w-8 h-8 rounded-none bg-[#7A0010] border border-[#D4AF37] flex items-center justify-center text-[#FFF1B9] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-[#FFF1B9] font-cinzel text-base">Club Alberdi de Burzaco</p>
                <p className="text-xs text-[#FDFDFD]/80">Int. C. Amenedo 280 — Burzaco</p>
                <p className="text-xs text-[#D4AF37]">Provincia de Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>

          {/* Evento 2026 */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#FFF1B9] tracking-wider uppercase font-cinzel flex items-center justify-center md:justify-start gap-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              Edición 2026
            </h4>
            <div className="text-sm space-y-1.5 text-[#FDFDFD]/80 font-montserrat">
              <p className="font-bold text-[#FFF1B9] text-base font-cinzel">Domingo 22 de Noviembre 2026</p>
              <p className="text-xs flex items-center justify-center md:justify-start gap-1.5 text-[#D4AF37]">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                Acreditación y apertura: 10:00 hs
              </p>
              <p className="text-xs text-[#C8102E] font-semibold">Abierto a todas las escuelas marciales</p>
            </div>
          </div>
        </div>

        {/* Motto banner from flyer */}
        <div className="my-8 py-4 px-6 bg-black/80 border border-[#D4AF37]/40 text-center max-w-2xl mx-auto shadow-lg">
          <p className="text-xs sm:text-sm text-[#FFF1B9] italic font-montserrat">
            "Con honor, respeto y espíritu marcial, los esperamos para compartir juntos este encuentro."
          </p>
          <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold block mt-1.5 font-cinzel">
            Asociación Long Hu He
          </span>
        </div>

        {/* Copyright & Organization & Authorship */}
        <div className="pt-8 border-t border-[#D4AF37]/30 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-xs text-[#FDFDFD]/60 font-montserrat">
          {/* Left: School info */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF37] shrink-0 bg-black shadow-md flex items-center justify-center">
              <Image
                src="/Logo-dorado.webp"
                alt="Logo Long Hu He"
                width={48}
                height={48}
                className="w-full h-full object-cover object-center scale-125"
              />
            </div>
            <div className="text-left">
              <p className="font-semibold text-[#FFF1B9] font-cinzel">Asociación Long Hu He</p>
              <p className="text-[11px]">Torneo Abierto de Artes Marciales 2026</p>
            </div>
          </div>

          {/* Center: Desarrollado por LDE-System */}
          <div className="flex items-center justify-center gap-1.5 text-xs">
            <span className="text-[#FDFDFD]/50">Desarrollado por</span>
            <a
              href="https://lde-system.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#FFF1B9] hover:text-[#D4AF37] transition-all inline-flex items-center gap-1 group border-b border-[#D4AF37]/40 hover:border-[#D4AF37] pb-0.5"
            >
              <span className="font-cinzel tracking-wider">LDE-System</span>
              <ExternalLink className="w-3 h-3 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right">
            <p>© 2026 Asociación Long Hu He. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

