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
      console.error("Fallo al obtener los competidores:", (err as Error).message);
      setError((err as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitors(); // Carga inicial

    // Actualiza cada 30 segundos
    const interval = setInterval(fetchCompetitors, 30000);

    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

  const categories = ["all", "Formas Tradicionales", "Formas Armas", "Combate por Puntos", "Tai Chi"];

  const filteredCompetitors =
    selectedCategory === "all" ? competitors : competitors.filter((c) => c.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 text-white"
      >
        Competidores Registrados
      </motion.h2>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-orange-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category === "all" ? "Todas las Categorías" : category}
          </motion.button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">Cargando competidores...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-6">
          <p className="text-red-400">⚠️ Error: {error}</p>
          <button
            onClick={fetchCompetitors}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            Reintentar
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
                  key={competitor.id} // ✅ Ahora es 100% único
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0 }} // Opcional: quité el delay por índice para que sea más fluido
                  onHoverStart={() => setHoveredCompetitor(competitor.id)}
                  onHoverEnd={() => setHoveredCompetitor(null)}
                >
                  <Card className="bg-gray-900/50 border-gray-700 p-4 hover:border-orange-500/50 transition-all duration-300">
                    <motion.div
                      animate={{
                        scale: hoveredCompetitor === competitor.id ? 1.02 : 1,
                      }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold"
                          animate={{
                            rotate: hoveredCompetitor === competitor.id ? 360 : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {competitor.generoInicial}
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-white">{competitor.name}</h3>
                          <p className="text-sm text-gray-400">{competitor.school}</p>
                        </div>
                      </div>

                      <motion.div
                        className="bg-orange-600/20 rounded-full px-3 py-1 text-xs text-orange-300 border border-orange-600/30"
                        animate={{
                          backgroundColor:
                            hoveredCompetitor === competitor.id ? "rgba(249, 115, 22, 0.3)" : "rgba(249, 115, 22, 0.2)",
                        }}
                      >
                        {competitor.category}
                      </motion.div>
                    </motion.div>
                  </Card>
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