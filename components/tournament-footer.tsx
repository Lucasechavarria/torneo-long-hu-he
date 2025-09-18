import Image from "next/image"
import { Instagram, Phone, MapPin } from "lucide-react"

export function TournamentFooter() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-work-sans)" }}>
              Contacto
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/541168774097"
                className="flex items-center justify-center md:justify-start gap-2 text-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5" />
                <span>+54 11 6877 4097</span>
              </a>
              <a
                href="https://instagram.com/longhuhe_kungfu"
                className="flex items-center justify-center md:justify-start gap-2 text-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
                <span>@longhuhe_kungfu</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-work-sans)" }}>
              Ubicación
            </h4>
            <div className="flex items-center justify-center md:justify-start gap-2 text-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p>Pellegrini 557</p>
                <p>Club Independiente Burzaco</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-work-sans)" }}>
              Evento
            </h4>
            <div className="text-foreground space-y-2">
              <p className="font-semibold" style={{ fontFamily: "var(--font-work-sans) !important" }}>23 de Noviembre 2025</p>
              <p>10:00 hs</p>
              <p className="text-secondary">Abierto a todas las escuelas</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src="/Logo-dorado.webp"
                alt="Asociacion Long Hu He Logo"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-work-sans)" }}>
                Asociacion Long Hu He
              </p>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-work-sans) !important" }}>Torneo Abierto de Artes Marciales 2025</p>
            </div>
          </div>
          <p className="text-muted-foreground" style={{ fontFamily: "var(--font-work-sans) !important" }}>
            © 2025 Asociacion Long Hu He. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground text-sm mt-2" style={{ fontFamily: "var(--font-open-sans)" }}>
            Diseñado por{" "}
            <a
              href="https://folkode.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Folkode
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
