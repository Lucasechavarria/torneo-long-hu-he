"use client";

import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { School, User, PlusCircle, Trash2, Users } from "lucide-react";

const formSchema = z.object({
  schoolName: z.string().min(2, {
    message: "El nombre de la escuela debe tener al menos 2 caracteres.",
  }),
  martialArtStyle: z.string().min(2, {
    message: "El estilo de arte marcial debe tener al menos 2 caracteres.",
  }),
  masterFullName: z.string().min(2, {
    message: "El nombre del maestro debe tener al menos 2 caracteres.",
  }),
  location: z.string().min(2, {
    message: "La localidad debe tener al menos 2 caracteres.",
  }),
  competitors: z.array(
    z.object({
      name: z.string().min(2, { message: "El nombre es requerido." }),
      lastName: z.string().min(2, { message: "El apellido es requerido." }),
      dni: z.string().min(7, { message: "El DNI es requerido." }),
      age: z.number().min(3, { message: "La edad mínima es 3 años." }).max(99, { message: "La edad máxima es 99 años." }),
      kyuRank: z.enum(["Kyu A", "Kyu B", "Dan"], {
        required_error: "Debes seleccionar un rango Kyu/Dan.",
      }),
      categoryAge: z.enum(["infantil", "juvenil", "adulto", "senior"], {
        required_error: "Debes seleccionar una categoría de edad.",
      }),
      formsCategories: z.array(z.string()).optional(),
      combatCategories: z.array(z.string()).optional(),
      weaponFormsCategories: z.array(z.string()).optional(),
      exhibition: z.boolean().default(false).optional(),
    })
  ),
});

export function RegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: "",
      martialArtStyle: "",
      masterFullName: "",
      location: "",
      competitors: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "competitors",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Aquí puedes enviar los datos a tu backend
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background text-foreground">
      <h2 className="text-4xl font-bold text-center mb-8 hero-text">
        Formulario de Inscripción
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Sección de Datos de la Escuela */}
          <section className="bg-card p-6 rounded-lg shadow-lg border border-border/30">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <School className="w-6 h-6" /> Datos de la Escuela
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Escuela</FormLabel>
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
                name="masterFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre y Apellido del Maestro/Profesor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
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
          <section className="bg-card p-6 rounded-lg shadow-lg border border-border/30">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" /> Datos de los Participantes
            </h3>

            {fields.map((item, index) => (
              <div key={item.id} className="mb-8 p-6 border border-border/30 rounded-lg bg-background/50 relative">
                <h4 className="text-xl font-medium mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" /> Competidor #{index + 1}
                </h4>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                  className="absolute top-4 right-4"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <FormField
                    control={form.control}
                    name={`competitors.${index}.name`}
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
                    name={`competitors.${index}.lastName`}
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
                    name={`competitors.${index}.dni`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DNI</FormLabel>
                        <FormControl>
                          <Input placeholder="DNI del competidor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`competitors.${index}.age`}
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

                {/* Rango Kyu/Dan */}
                <FormField
                  control={form.control}
                  name={`competitors.${index}.kyuRank`}
                  render={({ field }) => (
                    <FormItem className="space-y-3 mb-6">
                      <FormLabel>Rango Kyu/Dan</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Kyu A" />
                            </FormControl>
                            <FormLabel className="font-normal">Kyu A</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Kyu B" />
                            </FormControl>
                            <FormLabel className="font-normal">Kyu B</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Dan" />
                            </FormControl>
                            <FormLabel className="font-normal">Dan</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Categoría de Edad */}
                <FormField
                  control={form.control}
                  name={`competitors.${index}.categoryAge`}
                  render={({ field }) => (
                    <FormItem className="space-y-3 mb-6">
                      <FormLabel>Categoría de Edad</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="infantil" />
                            </FormControl>
                            <FormLabel className="font-normal">Infantil</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="juvenil" />
                            </FormControl>
                            <FormLabel className="font-normal">Juvenil</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="adulto" />
                            </FormControl>
                            <FormLabel className="font-normal">Adulto</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="senior" />
                            </FormControl>
                            <FormLabel className="font-normal">Senior</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Categorías a Participar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Formas */}
                  <FormField
                    control={form.control}
                    name={`competitors.${index}.formsCategories`}
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Formas</FormLabel>
                          <FormDescription>
                            Selecciona las categorías de formas en las que participará (puedes elegir varias).
                          </FormDescription>
                        </div>
                        {["tai chi", "chinas", "japonesas", "coreanas", "modernas"].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name={`competitors.${index}.formsCategories`}
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Combate */}
                  <FormField
                    control={form.control}
                    name={`competitors.${index}.combatCategories`}
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Combate</FormLabel>
                          <FormDescription>
                            Selecciona las categorías de combate en las que participará (puedes elegir varias).
                          </FormDescription>
                        </div>
                        {["individual", "por equipo", "kickboxing", "light contact"].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name={`competitors.${index}.combatCategories`}
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Formas con Armas */}
                  <FormField
                    control={form.control}
                    name={`competitors.${index}.weaponFormsCategories`}
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Formas con Armas</FormLabel>
                          <FormDescription>
                            Selecciona las categorías de formas con armas (puedes elegir varias).
                          </FormDescription>
                        </div>
                        {["armas cortas", "armas largas", "armas especiales"].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name={`competitors.${index}.weaponFormsCategories`}
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Exhibición */}
                  <FormField
                    control={form.control}
                    name={`competitors.${index}.exhibition`}
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
                </div>
                <Separator className="my-6" />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  name: "",
                  lastName: "",
                  dni: "",
                  age: 0,
                  kyuRank: "Kyu A", // Default value
                  categoryAge: "infantil", // Default value
                  formsCategories: [],
                  combatCategories: [],
                  weaponFormsCategories: [],
                  exhibition: false,
                })
              }
              className="w-full"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Agregar Competidor
            </Button>
          </section>

          <Button type="submit" className="w-full py-6 text-lg font-bold">
            Enviar Inscripción
          </Button>
        </form>
      </Form>
    </div>
  );
}