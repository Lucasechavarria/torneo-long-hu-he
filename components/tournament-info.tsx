import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sword, Shield, Users, Target, Zap, Trophy } from "lucide-react"

const categories = [
  {
    icon: Sword,
    title: "Formas Tradicionales",
    description: "Chinas, Japonesas, Coreanas y Modernas",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Formas con Armas",
    description: "Armas cortas, largas y especiales",
    color: "text-secondary",
  },
  {
    icon: Target,
    title: "Combate Individual",
    description: "Competencia uno contra uno",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Combate por Equipo",
    description: "Competencia grupal",
    color: "text-secondary",
  },
  {
    icon: Trophy,
    title: "Formas por Equipo",
    description: "Presentaciones grupales",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Kick-Boxing & Light Contact",
    description: "Modalidades de contacto",
    color: "text-secondary",
  },
]

export function TournamentInfo() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3
            className="text-3xl md:text-5xl font-bold mb-4 text-primary"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Categorías de Competencia
          </h3>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Participa en múltiples disciplinas y demuestra tu habilidad en diferentes artes marciales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <CardTitle
                    className="text-xl font-bold text-card-foreground"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-card-foreground" style={{ fontFamily: "var(--font-open-sans)" }}>
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-primary/10 rounded-lg p-8 border border-primary/20">
            <h4 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-work-sans)" }}>
              ¡Abierto a Todas las Escuelas!
            </h4>
            <p className="text-lg text-foreground" style={{ fontFamily: "var(--font-open-sans)" }}>
              Invitamos a participar a todas las escuelas de artes marciales.
              <br />
              Una oportunidad única para compartir conocimientos y experiencias.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
