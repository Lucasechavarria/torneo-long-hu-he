"use client";

import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { School, User, PlusCircle, Trash2, Users } from 'lucide-react';

const formSchema = z.object({
  school: z.string().min(2, {
    message: 'El nombre de la escuela debe tener al menos 2 caracteres.',
  }),
  martialArtStyle: z.string().min(2, {
    message: 'El estilo de arte marcial debe tener al menos 2 caracteres.',
  }),
  teacherName: z.string().min(2, {
    message: 'El nombre del maestro debe tener al menos 2 caracteres.',
  }),
  teacherLastName: z.string().min(2, {
    message: 'El apellido del maestro debe tener al menos 2 caracteres.',
  }),
  locality: z.string().min(2, {
    message: 'La localidad debe tener al menos 2 caracteres.',
  }),
  participants: z.array(
    z.object({
      name: z.string().min(2, { message: 'El nombre es requerido.' }),
      lastName: z.string().min(2, { message: 'El apellido es requerido.' }),
      age: z.coerce.number().min(3, { message: 'La edad mínima es 3 años.' }).max(99, { message: 'La edad máxima es 99 años.' }),
      grade: z.enum(['Kyu A', 'Kyu B', 'Dan'], {
        required_error: 'Debes seleccionar un rango Kyu/Dan.',
      }),
      category: z.enum(['Infantil', 'Juvenil', 'Adulto', 'Senior'], {
        required_error: 'Debes seleccionar una categoría de edad.',
      }),
      forms: z.enum(['Interna', 'Chinas', 'Japonesas', 'Coreanas', 'Modernas', ''], {
        required_error: 'Debes seleccionar una categoría de formas.',
      }).optional(),
      combat: z.array(z.string()).optional(),
      weapons: z.array(z.string()).optional(),
      exhibition: z.boolean().default(false).optional(),
    })
  ),
});

export function MartialArtsRegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: '',
      martialArtStyle: '',
      teacherName: '',
      teacherLastName: '',
      locality: '',
      participants: [
        {
          name: '',
          lastName: '',
          age: 0,
          grade: 'Kyu A',
          category: 'Infantil',
          forms: '',
          combat: [],
          weapons: [],
          exhibition: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'participants',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const dataToSend = values.participants.map((participant, index) => ({
        Fecha_Registro: new Date().toLocaleDateString('es-AR'),
        Escuela: values.school,
        Estilo_Arte_Marcial: values.martialArtStyle,
        Nombre_Maestro: values.teacherName,
        Apellido_Maestro: values.teacherLastName,
        Localidad: values.locality,
        Nombre_Participante: participant.name,
        Apellido_Participante: participant.lastName,
        Edad: participant.age,
        Grado: participant.grade,
        Categoria: participant.category,
        Numero_Participante: index + 1,
        Exhibicion: participant.exhibition ? 'Sí' : 'No',
        Formas: participant.forms || '',
        Combate: participant.combat?.join(', ') || '',
        Formas_con_Armas: participant.weapons?.join(', ') || '',
        Timestamp: new Date().toISOString(),
        ID_Registro: `REG_${Date.now()}_P${index + 1}`
      }));

      console.log('Datos preparados para Google Sheets:', dataToSend);

      const response = await fetch('https://script.google.com/macros/s/AKfycbwVT3il4lOPihQbjsdz1KKMgB_p5ZgiaXhl-15LgkoUX7VfsRJWYgPl_1mnlBFRqUkQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert(`✅ Registro exitoso! Se guardaron ${values.participants.length} participante(s).`);
        form.reset(); // Opcional: limpiar el formulario después del envío exitoso
      } else {
        console.error('Error en la respuesta del servidor:', response.status, response.statusText, await response.text());
        throw new Error(`Error al enviar los datos: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('❌ Error al enviar el formulario. Intenta nuevamente. Consulta la consola para más detalles.');
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background text-foreground">
      <h2 className="text-4xl font-bold text-center mb-8 hero-text">
        Registro de Competencia de Artes Marciales
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Sección de Datos de la Escuela */}
          <section className="bg-muted p-6 rounded-lg shadow-lg border border-border/30">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <School className="w-6 h-6 text-primary" /> Datos de la Escuela
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Escuela</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Dragón Blanco" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="martialArtStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estilo de Arte Marcial</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Kung Fu, Karate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teacherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Maestro/Profesor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teacherLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido del Maestro/Profesor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locality"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Localidad</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Buenos Aires" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Separator className="my-8" />

          {/* Sección de Datos de los Participantes */}
          <section className="bg-muted p-6 rounded-lg shadow-lg border border-border/30">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" /> Datos de los Participantes
            </h3>

            {fields.map((item, index) => (
              <div key={item.id} className="mb-8 p-6 border border-border/30 rounded-lg bg-muted/50 relative">
                <h4 className="text-xl font-medium mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-secondary" /> Competidor #{index + 1}
                </h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                  </Button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <FormField
                    control={form.control}
                    name={`participants.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre del competidor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`participants.${index}.lastName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellido del competidor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`participants.${index}.age`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Edad</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Edad" {...field} onChange={event => field.onChange(+event.target.value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Grado y Categoría */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name={`participants.${index}.grade`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start space-y-2 rounded-md border p-4">
                        <div className="space-y-1 leading-none">
                          <FormLabel>Grado</FormLabel>
                          <FormDescription>
                            Selecciona el grado del competidor.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {['Kyu A', 'Kyu B', 'Dan'].map(grade => (
                              <FormItem key={grade} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={grade} />
                                </FormControl>
                                <FormLabel className="font-normal">{grade}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`participants.${index}.category`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start space-y-2 rounded-md border p-4">
                        <div className="space-y-1 leading-none">
                          <FormLabel>Categoría</FormLabel>
                          <FormDescription>
                            Selecciona la categoría de edad del competidor.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {['Infantil', 'Juvenil', 'Adulto', 'Senior'].map(category => (
                              <FormItem key={category} className="flex items-center space-x-3">
                                <FormControl>
                                  <RadioGroupItem value={category} />
                                </FormControl>
                                <FormLabel className="font-normal">{category}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Categorías de Participación */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Exhibición */}
                  <FormField
                    control={form.control}
                    name={`participants.${index}.exhibition`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Exhibición</FormLabel>
                          <FormDescription>
                            Marcar si el competidor participará en exhibición.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Formas */}
                  <FormField
                    control={form.control}
                    name={`participants.${index}.forms`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start space-y-2 rounded-md border p-4">
                        <div className="space-y-1 leading-none">
                          <FormLabel>Formas</FormLabel>
                          <FormDescription>
                            Selecciona la categoría de formas del competidor.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {['Interna', 'Chinas', 'Japonesas', 'Coreanas', 'Modernas'].map(formOption => (
                              <FormItem key={formOption} className="flex items-center space-x-3">
                                <FormControl>
                                  <RadioGroupItem value={formOption} />
                                </FormControl>
                                <FormLabel className="font-normal">{formOption}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Combate */}
                  <FormField
                    control={form.control}
                    name={`participants.${index}.combat`}
                    render={() => (
                      <FormItem className="flex flex-col items-start space-y-2 rounded-md border p-4">
                        <div className="space-y-1 leading-none">
                          <FormLabel>Combate</FormLabel>
                          <FormDescription>
                            Selecciona las modalidades de combate en las que participará el competidor.
                          </FormDescription>
                        </div>
                        <div className="flex flex-col space-y-2 mt-4">
                          {['Individual', 'Por Equipo', 'Kickboxing', 'Light Contact'].map(combatOption => (
                            <FormField
                              key={combatOption}
                              control={form.control}
                              name={`participants.${index}.combat`}
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={combatOption}
                                    className="flex items-center space-x-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(combatOption)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), combatOption])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== combatOption
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm">
                                      {combatOption}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Formas con Armas */}
                  <FormField
                    control={form.control}
                    name={`participants.${index}.weapons`}
                    render={() => (
                      <FormItem className="flex flex-col items-start space-y-2 rounded-md border p-4">
                        <div className="space-y-1 leading-none">
                          <FormLabel>Formas con Armas</FormLabel>
                          <FormDescription>
                            Selecciona las categorías de formas con armas en las que participará el competidor.
                          </FormDescription>
                        </div>
                        <div className="flex flex-col space-y-2 mt-4">
                          {['Armas Cortas', 'Armas Largas', 'Armas Especiales'].map(weaponOption => (
                            <FormField
                              key={weaponOption}
                              control={form.control}
                              name={`participants.${index}.weapons`}
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={weaponOption}
                                    className="flex items-center space-x-3"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(weaponOption)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), weaponOption])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== weaponOption
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {weaponOption}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator className="my-6" />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  name: '',
                  lastName: '',
                  age: 0,
                  grade: 'Kyu A',
                  category: 'Infantil',
                  forms: '',
                  combat: [],
                  weapons: [],
                  exhibition: false,
                })
              }
              className="w-full"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Agregar Competidor
            </Button>
          </section>

          <Button type="submit" className="w-full py-6 text-lg font-bold">
            Enviar Registro
          </Button>
        </form>
      </Form>
      <div className="mt-8 p-4 bg-muted rounded-lg text-muted-foreground">
        <p className="text-sm">
          <strong>Nota:</strong> Los campos marcados con (*) son obligatorios.
          Todos los participantes se registrarán bajo la misma escuela y maestro especificados arriba.
        </p>
      </div>
    </div>
  );
}
