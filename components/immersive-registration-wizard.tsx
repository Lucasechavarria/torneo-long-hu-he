"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CheckCircle, ArrowRight, ArrowLeft, User, Trophy, FileText } from "lucide-react"

interface FormData {
  personalInfo: {
    nombre: string
    apellido: string
    edad: string
    telefono: string
    email: string
  }
  competitionInfo: {
    escuela: string
    categoria: string
    experiencia: string
  }
  additional: {
    emergencyContact: string
    medicalInfo: string
    agreement: boolean
  }
}

const steps = [
  { id: 1, title: "Información Personal", icon: User },
  { id: 2, title: "Competencia", icon: Trophy },
  { id: 3, title: "Información Adicional", icon: FileText },
]

export function ImmersiveRegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    personalInfo: { nombre: "", apellido: "", edad: "", telefono: "", email: "" },
    competitionInfo: { escuela: "", categoria: "", experiencia: "" },
    additional: { emergencyContact: "", medicalInfo: "", agreement: false },
  })
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const categories = [
    "Formas Tradicionales - Chinas",
    "Formas Tradicionales - Coreanas",
    "Formas Tradicionales - Japonesas",
    "Formas con Armas",
    "Combate por Puntos / Kick Boxing",
    "Tai Chi",
  ]

  const nextStep = () => {
    if (currentStep < 3) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)

      if (typeof window !== "undefined" && (window as any).playSuccessSound) {
        ;(window as any).playSuccessSound()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setCompletedSteps([...completedSteps, currentStep])

    if (typeof window !== "undefined" && (window as any).playSuccessSound) {
      ;(window as any).playSuccessSound()
    }

    // Generate CSV data
    const csvData = [
      ["Campo", "Valor"],
      ["Nombre", formData.personalInfo.nombre],
      ["Apellido", formData.personalInfo.apellido],
      ["Edad", formData.personalInfo.edad],
      ["Teléfono", formData.personalInfo.telefono],
      ["Email", formData.personalInfo.email],
      ["Escuela", formData.competitionInfo.escuela],
      ["Categoría", formData.competitionInfo.categoria],
      ["Experiencia", formData.competitionInfo.experiencia],
      ["Contacto de Emergencia", formData.additional.emergencyContact],
      ["Información Médica", formData.additional.medicalInfo],
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `inscripcion_torneo_${formData.personalInfo.nombre}_${formData.personalInfo.apellido}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                completedSteps.includes(step.id)
                  ? "bg-green-600 border-green-600 text-white"
                  : currentStep === step.id
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "bg-gray-800 border-gray-600 text-gray-400"
              }`}
              whileHover={{ scale: 1.1 }}
              animate={{
                scale: currentStep === step.id ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.5, repeat: currentStep === step.id ? Number.POSITIVE_INFINITY : 0 }}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <step.icon className="w-6 h-6" />
              )}
            </motion.div>

            {index < steps.length - 1 && (
              <motion.div
                className={`w-16 h-1 mx-2 ${completedSteps.includes(step.id) ? "bg-green-600" : "bg-gray-600"}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: completedSteps.includes(step.id) ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card className="bg-gray-900/50 border-gray-700 p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Información Personal</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre" className="text-white">
                    Nombre *
                  </Label>
                  <Input
                    id="nombre"
                    value={formData.personalInfo.nombre}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, nombre: e.target.value },
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="apellido" className="text-white">
                    Apellido *
                  </Label>
                  <Input
                    id="apellido"
                    value={formData.personalInfo.apellido}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, apellido: e.target.value },
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edad" className="text-white">
                    Edad *
                  </Label>
                  <Input
                    id="edad"
                    type="number"
                    value={formData.personalInfo.edad}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, edad: e.target.value },
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="telefono" className="text-white">
                    Teléfono *
                  </Label>
                  <Input
                    id="telefono"
                    value={formData.personalInfo.telefono}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, telefono: e.target.value },
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, email: e.target.value },
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Información de Competencia</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="escuela" className="text-white">
                    Escuela/Dojo *
                  </Label>
                  <Input
                    id="escuela"
                    value={formData.competitionInfo.escuela}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        competitionInfo: { ...formData.competitionInfo, escuela: e.target.value },
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="text-white">Categoría *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            competitionInfo: { ...formData.competitionInfo, categoria: category },
                          })
                        }
                        className={`p-3 rounded-lg text-left transition-all ${
                          formData.competitionInfo.categoria === category
                            ? "bg-orange-600 text-white border-orange-500"
                            : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                        } border`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="experiencia" className="text-white">
                    Años de Experiencia
                  </Label>
                  <Input
                    id="experiencia"
                    value={formData.competitionInfo.experiencia}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        competitionInfo: { ...formData.competitionInfo, experiencia: e.target.value },
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Ej: 5 años"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Información Adicional</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="emergency" className="text-white">
                    Contacto de Emergencia *
                  </Label>
                  <Input
                    id="emergency"
                    value={formData.additional.emergencyContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additional: { ...formData.additional, emergencyContact: e.target.value },
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Nombre y teléfono"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="medical" className="text-white">
                    Información Médica Relevante
                  </Label>
                  <Input
                    id="medical"
                    value={formData.additional.medicalInfo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additional: { ...formData.additional, medicalInfo: e.target.value },
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Alergias, medicamentos, etc."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={formData.additional.agreement}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additional: { ...formData.additional, agreement: e.target.checked },
                      })
                    }
                    className="w-4 h-4 text-orange-600 bg-gray-800 border-gray-600 rounded"
                  />
                  <Label htmlFor="agreement" className="text-white">
                    Acepto los términos y condiciones del torneo *
                  </Label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          {currentStep < 3 ? (
            <Button onClick={nextStep} className="bg-orange-600 hover:bg-orange-700 text-white">
              Siguiente
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <motion.div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.02, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }
                }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.additional.agreement}
                  className="bg-green-600 hover:bg-green-700 text-white px-12 py-7 text-2xl font-semibold shadow-xl"
                >
                  Completar Inscripción
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-green-500/20 rounded-full blur-xl -z-10"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  )
}
