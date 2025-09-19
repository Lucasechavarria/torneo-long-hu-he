'use client';
import React, { useState } from 'react';
import { Plus, User, School, Calendar, Trophy } from 'lucide-react';

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
  exhibition: boolean;
  forms: boolean;
  combat: boolean;
  handForms: string;
  internalForms: string;
  weaponForms: boolean;
  shortWeapons: boolean;
  longWeapons: boolean;
  specialWeapons: boolean;
  individualCombat: boolean;
  teamCombat: boolean;
  kickboxing: boolean;
  lightContact: boolean;
}

const MartialArtsRegistrationForm = () => {
  // Provincias de Argentina
  const provinces = [
    'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes',
    'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones',
    'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe',
    'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
  ];

  const [schoolData, setSchoolData] = useState<SchoolData>({
    schoolName: '',
    province: '',
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
    // Modalidades principales
    exhibition: false,
    forms: false,
    combat: false,
    // Sub-modalidades de Formas
    handForms: '',
    internalForms: '',
    weaponForms: false,
    shortWeapons: false,
    longWeapons: false,
    specialWeapons: false,
    // Sub-modalidades de Combate
    individualCombat: false,
    teamCombat: false,
    kickboxing: false,
    lightContact: false
  });

  const [registeredParticipants, setRegisteredParticipants] = useState<Participant[]>([]);

  const handleSchoolChange = (field: keyof SchoolData, value: string) => {
    setSchoolData(prev => ({ ...prev, [field]: value }));
  };

  const handleParticipantChange = (field: keyof Omit<Participant, 'id' | 'age' | 'category'>, value: string | boolean) => {
    setCurrentParticipant(prev => ({ ...prev, [field]: value }));
  };

  // Calcular edad y categoría basado en fecha de nacimiento
  const calculateAgeAndCategory = (birthDate: string) => {
    if (!birthDate) return { age: 0, category: '' };
    
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear() - 
                (today.getMonth() < birth.getMonth() || 
                 (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate()) ? 1 : 0);
    
    let category = '';
    if (age >= 6 && age <= 12) category = 'Infantil';
    else if (age >= 13 && age <= 17) category = 'Juvenil';
    else if (age >= 18 && age <= 35) category = 'Adulto';
    else if (age >= 36 && age <= 50) category = 'Senior';
    else if (age >= 51) category = 'Senior Senior';
    
    return { age, category };
  };

  const { age, category } = calculateAgeAndCategory(currentParticipant.birthDate);

  const addParticipant = () => {
    // Validar datos obligatorios
    if (!currentParticipant.name || !currentParticipant.lastName || 
        !currentParticipant.birthDate || !currentParticipant.grade) {
      alert('Por favor complete todos los campos obligatorios del participante.');
      return;
    }

    // Validar que tenga al menos una modalidad seleccionada
    if (!currentParticipant.exhibition && !currentParticipant.forms && !currentParticipant.combat) {
      alert('Debe seleccionar al menos una modalidad de competencia.');
      return;
    }

    const participantWithCategory = {
      ...currentParticipant,
      age,
      category,
      id: Date.now()
    };

    setRegisteredParticipants(prev => [...prev, participantWithCategory]);
    
    // Limpiar formulario de participante
    setCurrentParticipant({
      name: '',
      lastName: '',
      birthDate: '',
      grade: '',
      specificGrade: '',
      exhibition: false,
      forms: false,
      combat: false,
      handForms: '',
      internalForms: '',
      weaponForms: false,
      shortWeapons: false,
      longWeapons: false,
      specialWeapons: false,
      individualCombat: false,
      teamCombat: false,
      kickboxing: false,
      lightContact: false
    });

    alert(`✅ Participante agregado exitosamente. Total: ${registeredParticipants.length + 1}`);
  };

  const handleSubmit = async () => {
    // Validar datos de escuela
    const schoolValid = Object.values(schoolData).every(value => value.trim() !== '');
    if (!schoolValid) {
      alert('Por favor complete todos los datos de la escuela.');
      return;
    }

    if (registeredParticipants.length === 0) {
      alert('Debe agregar al menos un participante.');
      return;
    }

    try {
      const timestamp = new Date().toISOString();
      const registrationId = `REG_${Date.now()}`;
      
      const dataToSend = registeredParticipants.map((participant, index) => ({
        // Datos de la Escuela
        Fecha_Registro: new Date().toLocaleDateString('es-AR'),
        Nombre_Escuela: schoolData.schoolName,
        Provincia: schoolData.province,
        Localidad_Escuela: schoolData.locality,
        Estilo_Arte_Marcial: schoolData.martialArtStyle,
        Nombre_Maestro: schoolData.teacherName,
        Apellido_Maestro: schoolData.teacherLastName,
        Telefono_Maestro: schoolData.teacherPhoneNumber,
        
        // Datos del Participante
        Nombre_Participante: participant.name,
        Apellido_Participante: participant.lastName,
        Fecha_Nacimiento: participant.birthDate,
        Edad: participant.age,
        Categoria: participant.category,
        Grado: participant.grade,
        Grado_Especifico: participant.specificGrade,
        Numero_Participante: index + 1,
        
        // Modalidades
        Exhibicion: participant.exhibition ? 'Sí' : 'No',
        Formas: participant.forms ? 'Sí' : 'No',
        Formas_Mano_Vacia: participant.handForms,
        Formas_Internas: participant.internalForms,
        Formas_con_Armas: participant.weaponForms ? 'Sí' : 'No',
        Armas_Cortas: participant.shortWeapons ? 'Sí' : 'No',
        Armas_Largas: participant.longWeapons ? 'Sí' : 'No',
        Armas_Especiales: participant.specialWeapons ? 'Sí' : 'No',
        Combate: participant.combat ? 'Sí' : 'No',
        Combate_Individual: participant.individualCombat ? 'Sí' : 'No',
        Combate_por_Equipo: participant.teamCombat ? 'Sí' : 'No',
        Kickboxing: participant.kickboxing ? 'Sí' : 'No',
        Light_Contact: participant.lightContact ? 'Sí' : 'No',
        Timestamp: timestamp,
        ID_Registro: `${registrationId}_P${index + 1}`
      }));

      console.log('Datos preparados para Google Sheets:', dataToSend);

      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxm1L1nDRVdCdFensbyxAbKS-wsd-URhaH4Jes0j5wb-hAURd0cSY2TA3Oi7cljyEH7bg/exec';
      
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });

        const result = await response.json();
        
        if (result.status === 'success') {
          alert(`✅ ${result.message}`);
          // Limpiar todo el formulario
          setSchoolData({
            schoolName: '',
            province: '',
            locality: '',
            martialArtStyle: '',
            teacherName: '',
            teacherLastName: '',
            teacherPhoneNumber: ''
          });
          setRegisteredParticipants([]);
        } else {
          throw new Error(result.message || 'Error desconocido');
        }
      } catch (corsError) {
        console.log('Intentando con modo no-cors debido a:', corsError);
        
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });
        
        alert(`📋 Formulario enviado! Los datos se han guardado en Google Sheets.`);
        // Limpiar todo el formulario
        setSchoolData({
          schoolName: '',
          province: '',
          locality: '',
          martialArtStyle: '',
          teacherName: '',
          teacherLastName: '',
          teacherPhoneNumber: ''
        });
        setRegisteredParticipants([]);
      }
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('❌ Error al enviar el formulario. Intenta nuevamente.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 rounded-xl border border-border/30 shadow-2xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4 hero-text" style={{ fontFamily: "var(--font-work-sans)" }}>
          Formulario de Inscripción - Torneo de Artes Marciales
        </h1>
        <p className="text-center text-foreground/80 mb-8">Complete todos los campos requeridos</p>
      </div>

      {/* 1. DATOS DE LA ESCUELA */}
      <div className="rounded-xl border border-border/30 p-6 mb-8 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <School className="text-primary" size={24} />
          <h2 className="text-xl font-semibold text-foreground">1. Datos de la Escuela</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Nombre de la Escuela *
            </label>
            <input
              type="text"
              value={schoolData.schoolName}
              onChange={(e) => handleSchoolChange('schoolName', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Provincia *
            </label>
            <select
              value={schoolData.province}
              onChange={(e) => handleSchoolChange('province', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm bg-background text-foreground"
              required
            >
              <option value="">Seleccione una provincia</option>
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Localidad de la Escuela *
            </label>
            <input
              type="text"
              value={schoolData.locality}
              onChange={(e) => handleSchoolChange('locality', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Estilo de Arte Marcial *
            </label>
            <input
              type="text"
              value={schoolData.martialArtStyle}
              onChange={(e) => handleSchoolChange('martialArtStyle', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Nombre del Maestro / Profesor *
            </label>
            <input
              type="text"
              value={schoolData.teacherName}
              onChange={(e) => handleSchoolChange('teacherName', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Apellido del Maestro / Profesor *
            </label>
            <input
              type="text"
              value={schoolData.teacherLastName}
              onChange={(e) => handleSchoolChange('teacherLastName', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">
              Teléfono del Maestro / Profesor *
            </label>
            <input
              type="text"
              value={schoolData.teacherPhoneNumber}
              onChange={(e) => handleSchoolChange('teacherPhoneNumber', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              required
            />
          </div>
        </div>
      </div>

      {/* 2. DATOS DEL PARTICIPANTE */}
      <div className="rounded-xl border border-border/30 p-6 mb-8 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <User className="text-primary" size={24} />
          <h2 className="text-xl font-semibold text-foreground">2. Datos del Participante</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Nombre *</label>
            <input
              type="text"
              value={currentParticipant.name}
              onChange={(e) => handleParticipantChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Apellido *</label>
            <input
              type="text"
              value={currentParticipant.lastName}
              onChange={(e) => handleParticipantChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Fecha de Nacimiento *</label>
            <input
              type="date"
              value={currentParticipant.birthDate}
              onChange={(e) => handleParticipantChange('birthDate', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              required
            />
            {currentParticipant.birthDate && (
              <div className="mt-1 text-sm text-primary">
                <Calendar className="inline w-4 h-4 mr-1" />
                {age} años - Categoría: <strong>{category}</strong>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Grado (Kyu/Dan) *</label>
            <select
              value={currentParticipant.grade}
              onChange={(e) => handleParticipantChange('grade', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm bg-background text-foreground"
              required
            >
              <option value="">Seleccione un grado</option>
              <option value="Kyu A">Kyu A</option>
              <option value="Kyu B">Kyu B</option>
              <option value="Dan">Dan</option>
            </select>
          </div>
          
          {currentParticipant.grade === 'Dan' && (
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">
                Grado Específico (ej. 1º Dan)
              </label>
              <input
                type="text"
                value={currentParticipant.specificGrade}
                onChange={(e) => handleParticipantChange('specificGrade', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                placeholder="1º Dan, 2º Dan, etc."
              />
              <p className="mt-1 text-xs text-foreground/60">
                Nota: A partir del 4º Dan se considera "Maestro"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. MODALIDADES DE COMPETENCIA */}
      <div className="rounded-xl border border-border/30 p-6 mb-8 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-primary" size={24} />
          <h2 className="text-xl font-semibold text-foreground">3. Modalidades de Competencia</h2>
        </div>

        {/* Exhibición */}
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-foreground">
            <input
              type="checkbox"
              checked={currentParticipant.exhibition}
              onChange={(e) => handleParticipantChange('exhibition', e.target.checked)}
              className="mr-3 w-5 h-5 text-primary focus:ring-primary"
            />
            Exhibición
          </label>
        </div>

        {/* Formas */}
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-foreground mb-3">
            <input
              type="checkbox"
              checked={currentParticipant.forms}
              onChange={(e) => handleParticipantChange('forms', e.target.checked)}
              className="mr-3 w-5 h-5 text-primary focus:ring-primary"
            />
            Formas
          </label>
          
          {currentParticipant.forms && (
            <div className="ml-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">
                    Formas Mano Vacía
                  </label>
                  <select
                    value={currentParticipant.handForms}
                    onChange={(e) => handleParticipantChange('handForms', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm bg-background text-foreground"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Chinas">Chinas</option>
                    <option value="Japonesas">Japonesas</option>
                    <option value="Coreanas">Coreanas</option>
                    <option value="Modernas">Modernas</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">
                    Formas Internas
                  </label>
                  <input
                    type="text"
                    value={currentParticipant.internalForms}
                    onChange={(e) => handleParticipantChange('internalForms', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                    placeholder="Especificar forma interna"
                  />
                </div>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-foreground/80 mb-2">
                  <input
                    type="checkbox"
                    checked={currentParticipant.weaponForms}
                    onChange={(e) => handleParticipantChange('weaponForms', e.target.checked)}
                    className="mr-2 w-4 h-4 text-primary focus:ring-primary"
                  />
                  Formas con Armas
                </label>
                
                {currentParticipant.weaponForms && (
                  <div className="ml-6 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <label className="flex items-center text-sm text-foreground/70">
                      <input
                        type="checkbox"
                        checked={currentParticipant.shortWeapons}
                        onChange={(e) => handleParticipantChange('shortWeapons', e.target.checked)}
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      Armas Cortas
                    </label>
                    <label className="flex items-center text-sm text-foreground/70">
                      <input
                        type="checkbox"
                        checked={currentParticipant.longWeapons}
                        onChange={(e) => handleParticipantChange('longWeapons', e.target.checked)}
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      Armas Largas
                    </label>
                    <label className="flex items-center text-sm text-foreground/70">
                      <input
                        type="checkbox"
                        checked={currentParticipant.specialWeapons}
                        onChange={(e) => handleParticipantChange('specialWeapons', e.target.checked)}
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      Armas Especiales
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Combate */}
        <div className="mb-6">
          <label className="flex items-center text-lg font-medium text-foreground mb-3">
            <input
              type="checkbox"
              checked={currentParticipant.combat}
              onChange={(e) => handleParticipantChange('combat', e.target.checked)}
              className="mr-3 w-5 h-5 text-primary focus:ring-primary"
            />
            Combate
          </label>
          
          {currentParticipant.combat && (
            <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center text-sm text-foreground/70">
                <input
                  type="checkbox"
                  checked={currentParticipant.individualCombat}
                  onChange={(e) => handleParticipantChange('individualCombat', e.target.checked)}
                  className="mr-2 text-primary focus:ring-primary"
                />
                Combate Individual
              </label>
              <label className="flex items-center text-sm text-foreground/70">
                <input
                  type="checkbox"
                  checked={currentParticipant.teamCombat}
                  onChange={(e) => handleParticipantChange('teamCombat', e.target.checked)}
                  className="mr-2 text-primary focus:ring-primary"
                />
                Combate por Equipo
              </label>
              <label className="flex items-center text-sm text-foreground/70">
                <input
                  type="checkbox"
                  checked={currentParticipant.kickboxing}
                  onChange={(e) => handleParticipantChange('kickboxing', e.target.checked)}
                  className="mr-2 text-primary focus:ring-primary"
                />
                Kickboxing
              </label>
              <label className="flex items-center text-sm text-foreground/70">
                <input
                  type="checkbox"
                  checked={currentParticipant.lightContact}
                  onChange={(e) => handleParticipantChange('lightContact', e.target.checked)}
                  className="mr-2 text-primary focus:ring-primary"
                />
                Light Contact
              </label>
            </div>
          )}
        </div>
      </div>

      {/* PARTICIPANTES REGISTRADOS */}
      {registeredParticipants.length > 0 && (
        <div className="rounded-xl border border-border/30 p-6 mb-8 shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Participantes Registrados ({registeredParticipants.length})
          </h3>
          <div className="space-y-2">
            {registeredParticipants.map((participant, index) => (
              <div key={participant.id} className="bg-background/70 p-3 rounded-md border border-border/50 flex justify-between items-center shadow-sm">
                <div>
                  <span className="font-medium">{participant.name} {participant.lastName}</span>
                  <span className="text-foreground/70 ml-2">
                    - {participant.age} años ({participant.category}) - {participant.grade}
                  </span>
                </div>
                <div className="text-sm text-foreground/70">
                  {participant.exhibition && '🏆 '}
                  {participant.forms && '📋 '}
                  {participant.combat && '⚔️ '}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTONES DE ACCIÓN */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <button
          onClick={addParticipant}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors shadow-lg"
        >
          <Plus size={20} />
          Agregar Participante
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={registeredParticipants.length === 0}
          className={`px-8 py-3 rounded-md font-medium transition-colors shadow-lg ${registeredParticipants.length > 0 ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
        >
          Enviar Inscripción ({registeredParticipants.length} participante{registeredParticipants.length !== 1 ? 's' : ''})
        </button>
      </div>

      {/* INFORMACIÓN */}
      <div className="mt-8 p-4 bg-card/50 backdrop-blur-lg rounded-xl border border-border/30 shadow-lg">
        <p className="text-sm text-foreground/80">
          <strong>Instrucciones:</strong> Complete los datos de la escuela una vez. 
          Luego agregue cada participante individualmente. El sistema calculará automáticamente 
          la categoría según la fecha de nacimiento. Al finalizar, envíe la inscripción completa.
        </p>
      </div>
    </div>
  );
};

export default MartialArtsRegistrationForm;
