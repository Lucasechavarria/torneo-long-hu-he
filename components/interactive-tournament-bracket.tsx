"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Competitor {
  id: string;
  name: string;
  school: string;
  category: string;
  Timestamp: string;
  generoInicial: string;
}

export function InteractiveTournamentBracket() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredCompetitor, setHoveredCompetitor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompetitors = async () => {
    try {
      setError(null);
      const response = await fetch('/api/competitors');

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `HTTP ${response.status}`);
      }

      const rawData = await response.json();

      if (!Array.isArray(rawData)) {
        throw new Error('Invalid data format');
      }

      // ✅ CORRECCIÓN AQUÍ: Generar ID único combinando timestamp + índice
      const formattedCompetitors: Competitor[] = rawData.map((item, index) => ({
        id: `${item.timestamp || 'no-timestamp'}-${index}`, // ← ¡ID ÚNICO!
        name: item.nombreCompleto || 'Nombre no disponible',
        school: item.dojo || 'Escuela no disponible',
        category: item.categoria || 'General',
        Timestamp: item.timestamp || new Date().toISOString(),
        generoInicial: item.generoInicial || '?',
      }));

      // Ordenar por más reciente
      const sortedCompetitors = formattedCompetitors.sort((a, b) => {
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
      });

      setCompetitors(sortedCompetitors);
      setLoading(false);
    } catch (err) {
      console.warn("Aviso al sincronizar competidores:", (err as Error).message);
      // Solo marcar error visible si no tenemos competidores previos para no vaciar la lista
      setCompetitors((prev) => {
        if (prev.length === 0) {
          setError((err as Error).message);
        }
        return prev;
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitors(); // Carga inicial

    // Actualiza periódicamente solo si la pestaña está activa
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        fetchCompetitors();
      }
    }, 45000);

    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

  const categories = [
    "all",
    "Formas",
    "Formas con Armas",
    "Point Fighting",
    "Combate al Punto",
    "Exhibición",
    "Formas en Equipo",
    "Combate por Equipos",
    "Tai Chi",
  ];

  const filteredCompetitors =
    selectedCategory === "all"
      ? competitors
      : competitors.filter((c) => 
          c.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.toLowerCase().includes(c.category.toLowerCase())
        );

  return (
    <div id="competidores" className="max-w-6xl mx-auto p-6 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-6 py-1.5 plaque-banner text-[#FFF1B9] text-xs font-semibold tracking-widest uppercase mb-3 font-cinzel">
          Registro en Vivo · Edición 2026
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold gold-metallic-text tracking-wide font-cinzel mb-2">
          Competidores Registrados
        </h2>
        <p className="text-xs sm:text-sm text-[#FDFDFD]/80 font-montserrat">
          Nómina actualizada en tiempo real de los atletas inscriptos para el 22 de Noviembre
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 font-cinzel text-xs">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-none text-xs font-semibold tracking-wider transition-all cursor-pointer uppercase ${
              selectedCategory === category
                ? "bg-[#7A0010] text-[#FFF1B9] shadow-lg border border-[#D4AF37]"
                : "bg-black/80 text-[#FDFDFD]/70 hover:text-[#FFF1B9] border border-[#D4AF37]/30 hover:border-[#D4AF37]"
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {category === "all" ? "Todas las Disciplinas" : category}
          </motion.button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-[#FFF1B9] animate-pulse text-sm font-montserrat">Cargando competidores oficiales...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-6">
          <p className="text-[#D4AF37] text-sm font-montserrat">⚠️ Estado: Planilla en sincronización</p>
          <button
            onClick={fetchCompetitors}
            className="mt-3 px-4 py-1.5 btn-martial-secondary text-xs cursor-pointer"
          >
            Actualizar Nómina
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Competitors Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredCompetitors.map((competitor) => (
                <motion.div
                  key={competitor.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onHoverStart={() => setHoveredCompetitor(competitor.id)}
                  onHoverEnd={() => setHoveredCompetitor(null)}
                >
                  <div className="chinese-card-straight p-4 border-[#D4AF37]/30 hover:border-[#FFF1B9] transition-all duration-300 shadow-md">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-[#C8102E] to-[#7A0010] border border-[#D4AF37] rounded-none flex items-center justify-center text-[#FFF1B9] font-bold font-cinzel text-sm shrink-0"
                          animate={{
                            rotate: hoveredCompetitor === competitor.id ? 360 : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {competitor.generoInicial}
                        </motion.div>
                        <div className="font-montserrat">
                          <h3 className="font-bold text-[#FDFDFD] text-sm font-cinzel">{competitor.name}</h3>
                          <p className="text-xs text-[#D4AF37]">{competitor.school}</p>
                        </div>
                      </div>

                      <motion.div
                        className="bg-[#7A0010]/40 px-2.5 py-1 text-[11px] text-[#FFF1B9] font-semibold border border-[#D4AF37]/40 inline-block font-montserrat"
                        animate={{
                          backgroundColor:
                            hoveredCompetitor === competitor.id ? "rgba(200, 16, 46, 0.45)" : "rgba(122, 0, 16, 0.35)",
                        }}
                      >
                        {competitor.category}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredCompetitors.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-400">No hay competidores en esta categoría aún.</p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}