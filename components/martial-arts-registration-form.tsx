'use client';

import React, { useState } from 'react';
import { Plus, User, School, Calendar, Trophy, Trash2, CheckCircle2, ShieldCheck, Loader2, Sparkles, Swords, Sword } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SchoolData {
  schoolName: string;
  province: string;
  locality: string;
  martialArtStyle: string;
  teacherName: string;
  teacherLastName: string;
  teacherPhoneNumber: string;
}

interface Participant {
  id: number;
  name: string;
  lastName: string;
  birthDate: string;
  age: number;
  category: string;
  grade: string;
  specificGrade: string;
  // Modalidades principales (respetando estructura original + adiciones 2026)
  exhibition: boolean;
  forms: boolean;
  handForms: string; // Chinas, Japonesas, Coreanas, Modernas
  internalForms: string;
  taiChi: boolean; // Agregado 2026
  weaponForms: boolean;
  shortWeapons: boolean;
  longWeapons: boolean;
  specialWeapons: boolean;
  combat: boolean;
  pointFighting: boolean; // Agregado 2026
  combateAlPunto: boolean;
  teamCombat: boolean;
  teamForms: boolean;
}

export default function MartialArtsRegistrationForm() {
  const provinces = [
    'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes',
    'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones',
    'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe',
    'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
  ];

  const [schoolData, setSchoolData] = useState<SchoolData>({
    schoolName: '',
    province: 'Buenos Aires',
    locality: '',
    martialArtStyle: '',
    teacherName: '',
    teacherLastName: '',
    teacherPhoneNumber: ''
  });

  const [currentParticipant, setCurrentParticipant] = useState<Omit<Participant, 'id' | 'age' | 'category'>>({
    name: '',
    lastName: '',
    birthDate: '',
    grade: '',
    specificGrade: '',
    exhibition: false,
    forms: false,
    handForms: '',
    internalForms: '',
    taiChi: false,
    weaponForms: false,
    shortWeapons: false,
    longWeapons: false,
    specialWeapons: false,
    combat: false,
    pointFighting: false,
    combateAlPunto: false,
    teamCombat: false,
    teamForms: false
  });

  const [registeredParticipants, setRegisteredParticipants] = useState<Participant[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSchoolChange = (field: keyof SchoolData, value: string) => {
    setSchoolData(prev => ({ ...prev, [field]: value }));
  };

  const handleParticipantChange = (field: keyof Omit<Participant, 'id' | 'age' | 'category'>, value: any) => {
    setCurrentParticipant(prev => ({ ...prev, [field]: value }));
  };

  // Calcular edad y categoría al día del torneo (22/11/2026)
  const calculateAgeAndCategory = (birthDate: string) => {
    if (!birthDate) return { age: 0, category: '' };

    const tournamentDate = new Date("2026-11-22");
    const birth = new Date(birthDate);

    let age = tournamentDate.getFullYear() - birth.getFullYear();
    const monthDiff = tournamentDate.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && tournamentDate.getDate() < birth.getDate())) {
      age--;
    }

    let category = '';
    if (age >= 4 && age <= 12) category = 'Infantil';
    else if (age >= 13 && age <= 17) category = 'Juvenil';
    else if (age >= 18 && age <= 35) category = 'Adulto';
    else if (age >= 36 && age <= 50) category = 'Senior';
    else if (age >= 51) category = 'Master / Senior Gold';
    else category = 'Promocional';

    return { age: Math.max(0, age), category };
  };

  const { age, category } = calculateAgeAndCategory(currentParticipant.birthDate);

  const hasSelectedAnyModalidad =
    currentParticipant.exhibition ||
    currentParticipant.forms ||
    currentParticipant.taiChi ||
    currentParticipant.combat ||
    currentParticipant.teamForms;

  const addParticipant = () => {
    if (!currentParticipant.name.trim() || !currentParticipant.lastName.trim() || 
        !currentParticipant.birthDate || !currentParticipant.grade) {
      alert('Por favor complete los campos obligatorios del participante (Nombre, Apellido, Fecha de Nacimiento y Grado).');
      return;
    }

    if (!hasSelectedAnyModalidad) {
      alert('Debe seleccionar al menos una modalidad de competencia (Exhibición, Formas, Combate o Tai Chi).');
      return;
    }

    const participantWithCategory: Participant = {
      ...currentParticipant,
      age,
      category,
      id: Date.now()
    };

    setRegisteredParticipants(prev => [...prev, participantWithCategory]);

    if (typeof window !== "undefined" && (window as any).playSuccessSound) {
      ;(window as any).playSuccessSound();
    }

    // Limpiar formulario del participante para el siguiente
    setCurrentParticipant({
      name: '',
      lastName: '',
      birthDate: '',
      grade: '',
      specificGrade: '',
      exhibition: false,
      forms: false,
      handForms: '',
      internalForms: '',
      taiChi: false,
      weaponForms: false,
      shortWeapons: false,
      longWeapons: false,
      specialWeapons: false,
      combat: false,
      pointFighting: false,
      combateAlPunto: false,
      teamCombat: false,
      teamForms: false
    });
  };

  const removeParticipant = (id: number) => {
    setRegisteredParticipants(prev => prev.filter(p => p.id !== id));
  };

  const handleSubmit = async () => {
    const schoolValid = Object.values(schoolData).every(val => typeof val === 'string' && val.trim() !== '');
    if (!schoolValid) {
      alert('Por favor complete todos los datos de la Escuela.');
      return;
    }

    if (registeredParticipants.length === 0) {
      alert('Debe agregar al menos un participante antes de enviar.');
      return;
    }

    setIsSubmitting(true);

    try {
      const timestamp = new Date().toISOString();
      const registrationId = `REG2026_${Date.now()}`;

      // Payload mapeado a la planilla Google Sheets respetando las columnas históricas
      const dataToSend = registeredParticipants.map((participant, index) => ({
        Fecha_Registro: new Date().toLocaleDateString('es-AR'),
        Nombre_Escuela: schoolData.schoolName,
        Provincia: schoolData.province,
        Localidad_Escuela: schoolData.locality,
        Estilo_Arte_Marcial: schoolData.martialArtStyle,
        Nombre_Maestro: schoolData.teacherName,
        Apellido_Maestro: schoolData.teacherLastName,
        Telefono_Maestro: schoolData.teacherPhoneNumber,

        Nombre_Participante: participant.name,
        Apellido_Participante: participant.lastName,
        Fecha_Nacimiento: participant.birthDate,
        Edad: participant.age,
        Categoria: participant.category,
        Grado: participant.grade,
        Grado_Especifico: participant.specificGrade || participant.grade,
        Numero_Participante: index + 1,

        Exhibicion: participant.exhibition ? 'Sí' : 'No',
        Formas: participant.forms ? 'Sí' : 'No',
        Formas_Mano_Vacia: participant.handForms,
        Formas_Internas: participant.taiChi ? `Tai Chi ${participant.internalForms}`.trim() : participant.internalForms,
        Formas_con_Armas: participant.weaponForms ? 'Sí' : 'No',
        Armas_Cortas: participant.shortWeapons ? 'Sí' : 'No',
        Armas_Largas: participant.longWeapons ? 'Sí' : 'No',
        Armas_Especiales: participant.specialWeapons ? 'Sí' : 'No',
        Combate: participant.combat ? 'Sí' : 'No',
        Combate_Individual: (participant.pointFighting || participant.combateAlPunto) ? 'Sí' : 'No',
        Combate_por_Equipo: participant.teamCombat ? 'Sí' : (participant.teamForms ? 'Formas Equipo' : 'No'),
        Kickboxing: participant.pointFighting ? 'Point Fighting' : 'No',
        Light_Contact: participant.combateAlPunto ? 'Combate al Punto' : 'No',
        Timestamp: timestamp,
        ID_Registro: `${registrationId}_P${index + 1}`
      }));

      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxm1L1nDRVdCdFensbyxAbKS-wsd-URhaH4Jes0j5wb-hAURd0cSY2TA3Oi7cljyEH7bg/exec';

      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });
      } catch (corsErr) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });
      }

      setSubmitSuccess(true);
      setRegisteredParticipants([]);
      alert(`✅ ¡Inscripción enviada exitosamente para ${dataToSend.length} participante(s)!`);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      alert('Error al enviar el formulario. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 px-8 py-2 plaque-banner mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#FFF1B9] uppercase font-cinzel">
            Inscripción Oficial 2026
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#FDFDFD]/80 font-montserrat">
          Torneo Abierto de Artes Marciales 2026 — Complete la nómina de su escuela
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-emerald-950/70 border border-emerald-500/50 text-center text-emerald-200 shadow-xl">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-1" />
          <h3 className="text-base font-bold text-white font-cinzel">¡Inscripción Guardada Exitosamente!</h3>
          <p className="text-xs text-emerald-300/80 font-montserrat">Los datos se han guardado en la planilla del torneo.</p>
        </div>
      )}

      {/* 1. DATOS DE LA ESCUELA */}
      <div className="chinese-card-straight p-6 sm:p-8 mb-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D4AF37]/30">
          <School className="text-[#D4AF37]" size={20} />
          <h3 className="text-base sm:text-lg font-bold text-[#FFF1B9] font-cinzel tracking-wider uppercase">
            1. Datos de la Escuela
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="martial-label block mb-1">Nombre de la Escuela *</label>
            <input
              type="text"
              value={schoolData.schoolName}
              onChange={(e) => handleSchoolChange('schoolName', e.target.value)}
              className="martial-input w-full text-sm"
              required
            />
          </div>

          <div>
            <label className="martial-label block mb-1">Provincia *</label>
            <select
              value={schoolData.province}
              onChange={(e) => handleSchoolChange('province', e.target.value)}
              className="martial-input w-full text-sm"
              required
            >
              {provinces.map(p => (
                <option key={p} value={p} className="bg-black text-[#FDFDFD]">{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="martial-label block mb-1">Localidad de la Escuela *</label>
            <input
              type="text"
              value={schoolData.locality}
              onChange={(e) => handleSchoolChange('locality', e.target.value)}
              className="martial-input w-full text-sm"
              required
            />
          </div>

          <div>
            <label className="martial-label block mb-1">Estilo de Arte Marcial *</label>
            <input
              type="text"
              value={schoolData.martialArtStyle}
              onChange={(e) => handleSchoolChange('martialArtStyle', e.target.value)}
              className="martial-input w-full text-sm"
              required
            />
          </div>

          <div>
            <label className="martial-label block mb-1">Nombre del Maestro / Profesor *</label>
            <input
              type="text"
              value={schoolData.teacherName}
              onChange={(e) => handleSchoolChange('teacherName', e.target.value)}
              className="martial-input w-full text-sm"
              required
            />
          </div>

          <div>
            <label className="martial-label block mb-1">Apellido del Maestro / Profesor *</label>
            <input
              type="text"
              value={schoolData.teacherLastName}
              onChange={(e) => handleSchoolChange('teacherLastName', e.target.value)}
              className="martial-input w-full text-sm"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="martial-label block mb-1">Teléfono del Maestro / Profesor *</label>
            <input
              type="tel"
              value={schoolData.teacherPhoneNumber}
              onChange={(e) => handleSchoolChange('teacherPhoneNumber', e.target.value)}
              placeholder="Ej. 11 6877-4097"
              className="martial-input w-full text-sm"
              required
            />
          </div>
        </div>
      </div>

      {/* 2. DATOS DEL PARTICIPANTE */}
      <div className="chinese-card-straight p-6 sm:p-8 mb-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D4AF37]/30">
          <User className="text-[#D4AF37]" size={20} />
          <h3 className="text-base sm:text-lg font-bold text-[#FFF1B9] font-cinzel tracking-wider uppercase">
            2. Datos del Participante
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div>
            <label className="martial-label block mb-1">Nombre *</label>
            <input
              type="text"
              value={currentParticipant.name}
              onChange={(e) => handleParticipantChange('name', e.target.value)}
              className="martial-input w-full text-sm"
              placeholder="Ej. Lucas"
            />
          </div>

          <div>
            <label className="martial-label block mb-1">Apellido *</label>
            <input
              type="text"
              value={currentParticipant.lastName}
              onChange={(e) => handleParticipantChange('lastName', e.target.value)}
              className="martial-input w-full text-sm"
              placeholder="Ej. Gómez"
            />
          </div>

          <div>
            <label className="martial-label block mb-1">Fecha de Nacimiento *</label>
            <input
              type="date"
              value={currentParticipant.birthDate}
              onChange={(e) => handleParticipantChange('birthDate', e.target.value)}
              className="martial-input w-full text-sm"
            />
            {currentParticipant.birthDate && (
              <div className="mt-1.5 text-xs text-[#FFF1B9] flex items-center gap-1 font-montserrat font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{age} años — Categoría: <strong className="text-white font-bold">{category}</strong></span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="martial-label block mb-1">Grado (Kyu/Dan) *</label>
            <select
              value={currentParticipant.grade}
              onChange={(e) => handleParticipantChange('grade', e.target.value)}
              className="martial-input w-full text-sm"
            >
              <option value="" className="bg-black text-[#FDFDFD]">Seleccione un grado</option>
              <option value="Kyu A" className="bg-black text-[#FDFDFD]">Kyu A</option>
              <option value="Kyu B" className="bg-black text-[#FDFDFD]">Kyu B</option>
              <option value="Dan" className="bg-black text-[#FDFDFD]">Dan</option>
            </select>
          </div>

          {currentParticipant.grade === 'Dan' && (
            <div>
              <label className="martial-label block mb-1">Grado Específico (ej. 1º Dan)</label>
              <input
                type="text"
                value={currentParticipant.specificGrade}
                onChange={(e) => handleParticipantChange('specificGrade', e.target.value)}
                placeholder="1º Dan, 2º Dan, etc."
                className="martial-input w-full text-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* 3. MODALIDADES DE COMPETENCIA */}
      <div className="chinese-card-straight p-6 sm:p-8 mb-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D4AF37]/30">
          <Trophy className="text-[#D4AF37]" size={20} />
          <h3 className="text-base sm:text-lg font-bold text-[#FFF1B9] font-cinzel tracking-wider uppercase">
            3. Modalidades de Competencia
          </h3>
        </div>

        {/* Exhibición */}
        <div className="mb-4 pb-3 border-b border-white/10">
          <label className="flex items-center text-sm font-semibold text-[#FDFDFD] cursor-pointer font-montserrat">
            <input
              type="checkbox"
              checked={currentParticipant.exhibition}
              onChange={(e) => handleParticipantChange('exhibition', e.target.checked)}
              className="mr-3 w-4 h-4 rounded-none accent-[#C8102E] cursor-pointer"
            />
            🏆 Exhibición (Demostraciones individuales o de escuela)
          </label>
        </div>

        {/* Formas */}
        <div className="mb-4 pb-3 border-b border-white/10">
          <label className="flex items-center text-sm font-semibold text-[#FDFDFD] cursor-pointer mb-2 font-montserrat">
            <input
              type="checkbox"
              checked={currentParticipant.forms}
              onChange={(e) => handleParticipantChange('forms', e.target.checked)}
              className="mr-3 w-4 h-4 rounded-none accent-[#C8102E] cursor-pointer"
            />
            🥋 Formas
          </label>

          {currentParticipant.forms && (
            <div className="ml-7 space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="martial-label block mb-1">Formas Mano Vacía</label>
                  <select
                    value={currentParticipant.handForms}
                    onChange={(e) => handleParticipantChange('handForms', e.target.value)}
                    className="martial-input w-full text-xs"
                  >
                    <option value="" className="bg-black text-[#FDFDFD]">Seleccione estilo</option>
                    <option value="Chinas" className="bg-black text-[#FDFDFD]">Chinas</option>
                    <option value="Japonesas" className="bg-black text-[#FDFDFD]">Japonesas</option>
                    <option value="Coreanas" className="bg-black text-[#FDFDFD]">Coreanas</option>
                    <option value="Modernas" className="bg-black text-[#FDFDFD]">Modernas</option>
                  </select>
                </div>

                <div>
                  <label className="martial-label block mb-1">Formas Internas</label>
                  <input
                    type="text"
                    value={currentParticipant.internalForms}
                    onChange={(e) => handleParticipantChange('internalForms', e.target.value)}
                    placeholder="Especificar forma interna"
                    className="martial-input w-full text-xs"
                  />
                </div>
              </div>

              {/* Sub: Formas con Armas */}
              <div className="pt-2">
                <label className="flex items-center text-xs font-semibold text-[#FFF1B9] cursor-pointer mb-2 font-montserrat">
                  <input
                    type="checkbox"
                    checked={currentParticipant.weaponForms}
                    onChange={(e) => handleParticipantChange('weaponForms', e.target.checked)}
                    className="mr-2 accent-[#C8102E] cursor-pointer"
                  />
                  ⚔️ Formas con Armas
                </label>

                {currentParticipant.weaponForms && (
                  <div className="ml-5 flex flex-wrap gap-4 text-xs font-montserrat pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer text-[#FDFDFD]">
                      <input
                        type="checkbox"
                        checked={currentParticipant.shortWeapons}
                        onChange={(e) => handleParticipantChange('shortWeapons', e.target.checked)}
                        className="accent-[#C8102E]"
                      />
                      Armas Cortas
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[#FDFDFD]">
                      <input
                        type="checkbox"
                        checked={currentParticipant.longWeapons}
                        onChange={(e) => handleParticipantChange('longWeapons', e.target.checked)}
                        className="accent-[#C8102E]"
                      />
                      Armas Largas
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[#FDFDFD]">
                      <input
                        type="checkbox"
                        checked={currentParticipant.specialWeapons}
                        onChange={(e) => handleParticipantChange('specialWeapons', e.target.checked)}
                        className="accent-[#C8102E]"
                      />
                      Armas Especiales
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Combate (Point Fighting, Combate al Punto, Equipos) */}
        <div className="mb-4 pb-3 border-b border-white/10">
          <label className="flex items-center text-sm font-semibold text-[#FDFDFD] cursor-pointer mb-2 font-montserrat">
            <input
              type="checkbox"
              checked={currentParticipant.combat}
              onChange={(e) => handleParticipantChange('combat', e.target.checked)}
              className="mr-3 w-4 h-4 rounded-none accent-[#C8102E] cursor-pointer"
            />
            🥊 Combate
          </label>

          {currentParticipant.combat && (
            <div className="ml-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-montserrat">
              <label className="flex items-center gap-2 text-[#FDFDFD] cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentParticipant.pointFighting}
                  onChange={(e) => handleParticipantChange('pointFighting', e.target.checked)}
                  className="accent-[#C8102E]"
                />
                Point Fighting (Combate al Punto)
              </label>

              <label className="flex items-center gap-2 text-[#FDFDFD] cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentParticipant.combateAlPunto}
                  onChange={(e) => handleParticipantChange('combateAlPunto', e.target.checked)}
                  className="accent-[#C8102E]"
                />
                Combate al Punto (Enfrentamiento Individual)
              </label>

              <label className="flex items-center gap-2 text-[#FDFDFD] cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentParticipant.teamCombat}
                  onChange={(e) => handleParticipantChange('teamCombat', e.target.checked)}
                  className="accent-[#C8102E]"
                />
                Combate por Equipo
              </label>
            </div>
          )}
        </div>

        {/* Tai Chi */}
        <div className="mb-4 pb-3 border-b border-white/10">
          <label className="flex items-center text-sm font-semibold text-[#FDFDFD] cursor-pointer font-montserrat">
            <input
              type="checkbox"
              checked={currentParticipant.taiChi}
              onChange={(e) => handleParticipantChange('taiChi', e.target.checked)}
              className="mr-3 w-4 h-4 rounded-none accent-[#C8102E] cursor-pointer"
            />
            ☯️ Tai Chi (Estilos tradicionales internos)
          </label>
        </div>

        {/* Formas en Equipo */}
        <div className="mb-2">
          <label className="flex items-center text-sm font-semibold text-[#FDFDFD] cursor-pointer font-montserrat">
            <input
              type="checkbox"
              checked={currentParticipant.teamForms}
              onChange={(e) => handleParticipantChange('teamForms', e.target.checked)}
              className="mr-3 w-4 h-4 rounded-none accent-[#C8102E] cursor-pointer"
            />
            👥 Formas en Equipo (Sincronización grupal)
          </label>
        </div>
      </div>

      {/* 4. BOTONES Y LISTA DE PARTICIPANTES */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        <Button
          type="button"
          onClick={addParticipant}
          className="btn-martial-secondary px-6 py-3 cursor-pointer w-full sm:w-auto"
        >
          <Plus size={16} className="mr-2 text-[#D4AF37]" />
          Agregar Participante a la Lista
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={registeredParticipants.length === 0 || isSubmitting}
          className="btn-martial-primary px-8 py-3 cursor-pointer w-full sm:w-auto disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando Nómina...
            </>
          ) : (
            `Enviar Inscripción (${registeredParticipants.length} Atleta${registeredParticipants.length !== 1 ? 's' : ''})`
          )}
        </Button>
      </div>

      {/* LISTA COMPACTA DE PARTICIPANTES REGISTRADOS */}
      {registeredParticipants.length > 0 && (
        <div className="chinese-card-straight p-6 mb-8 shadow-2xl">
          <h4 className="text-base font-bold text-[#FFF1B9] mb-4 font-cinzel flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
            <span>Nómina de Participantes ({registeredParticipants.length})</span>
            <span className="text-xs text-[#D4AF37] font-montserrat font-normal tracking-wide">Lista para enviar</span>
          </h4>

          <div className="space-y-2.5">
            {registeredParticipants.map((p, index) => (
              <div
                key={p.id}
                className="p-3 bg-black/80 border border-[#D4AF37]/30 flex items-center justify-between gap-3 text-xs font-montserrat"
              >
                <div>
                  <span className="font-bold text-[#FDFDFD]">{index + 1}. {p.name} {p.lastName}</span>
                  <span className="text-[#FFF1B9]/80 ml-2">
                    — {p.age} años ({p.category}) · {p.grade}
                  </span>
                  <div className="text-[11px] text-[#D4AF37] mt-1 flex flex-wrap gap-2">
                    {p.exhibition && <span className="bg-[#C8102E]/20 border border-[#C8102E]/40 px-1.5 py-0.5 rounded-none">🏆 Exhibición</span>}
                    {p.forms && <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-1.5 py-0.5 rounded-none">🥋 Formas</span>}
                    {p.weaponForms && <span className="bg-[#C8102E]/20 border border-[#C8102E]/40 px-1.5 py-0.5 rounded-none">⚔️ Armas</span>}
                    {(p.pointFighting || p.combateAlPunto || p.teamCombat) && <span className="bg-[#C8102E]/30 border border-[#C8102E]/50 px-1.5 py-0.5 rounded-none">🥊 Combate</span>}
                    {p.taiChi && <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-1.5 py-0.5 rounded-none">☯️ Tai Chi</span>}
                    {p.teamForms && <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-1.5 py-0.5 rounded-none">👥 Formas Eq.</span>}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeParticipant(p.id)}
                  className="text-red-400 hover:text-red-300 p-2 border border-red-500/20 hover:border-red-500/60 transition-colors"
                  title="Eliminar participante"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="p-4 bg-black/70 border border-[#D4AF37]/30 text-xs text-[#FDFDFD]/80 text-center font-montserrat">
        💡 <strong>Instrucciones:</strong> Complete los datos de la escuela, luego agregue cada participante. El sistema calcula automáticamente la edad y categoría para el 22/11/2026. Al finalizar, presione "Enviar Inscripción".
      </div>
    </div>
  );
}
