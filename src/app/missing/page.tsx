"use client"
 
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
const upTo = (max: number) => z.string().max(max, `עד ${max} תווים`)
const atLeast = (min: number) => z.string().min(min, `לפחות ${min} תווים`)
const between = (min: number, max: number) => z.string().min(min, `לפחות ${min} תווים`).max(max, `עד ${max} תווים`)
const phone = z.string().min(9, 'מספר הטלפון חייב להכיל לפחות 9 תווים').max(15, 'מספר הטלפון יכול להכיל עד 15 תווים')
const name = between(2, 50)
const details = between(2, 500)
const personFormSchema = z.object({
    firstName: name,
    lastName: name,
    contactName: name,
    contactPhone: phone,
    lastSeen: details,
    identifyingDetails: details,
    notes: details,
  });
  
  const animalFormSchema = z.object({
      name: name,
      contactName: name,
      contactPhone: phone,
      species: name,
      breed: name,
      color: name,
      lastSeen: details,
      identifyingDetails: details,
      notes: details,
  });
  const firstNameField = {
    name: "firstName",
    label: "שם פרטי",
    placeholder: "שם פרטי",
  };
    const lastNameField = {
        name: "lastName",
        label: "שם משפחה",
        placeholder: "שם משפחה",
    };
    const nameField = {
        name: "name",
        label: "שם",
        placeholder: "שם",
    };
    const speciesField = {
        name: "species",
        label: "מין",
        placeholder: "מין",
    };
    const breedField = {
        name: "breed",
        label: "גזע",
        placeholder: "גזע",
    };
    const colorField = {
        name: "color",
        label: "צבע",
        placeholder: "צבע",
    };
    const contactNameField = {
        name: "contactName",
        label: "שם איש קשר",
        placeholder: "שם איש קשר",
    };
    const contactPhoneField = {
        name: "contactPhone",
        label: "טלפון איש קשר",
        placeholder: "טלפון איש קשר",
    };
    const lastSeenField = {
        name: "lastSeen",
        label: "מיקום אחרון",
        placeholder: "מיקום אחרון",
    };
    const identifyingDetailsField = {
        name: "identifyingDetails",
        label: "פרטים מזהים",
        placeholder: "פרטים מזהים",
    };
    const notesField = {
        name: "notes",
        label: "הערות",
        placeholder: "הערות",
    };
  const personFields = [
    firstNameField,
    lastNameField,
    contactNameField,
    contactPhoneField,
    lastSeenField,
    identifyingDetailsField,
    notesField,
  ];
  const animalFields = [
    nameField,
    speciesField,
    breedField,
    colorField,
    contactNameField,
    contactPhoneField,
    lastSeenField,
    identifyingDetailsField,
    notesField,
  ];
  const PersonForm = () => {
    const form = useForm<z.infer<typeof personFormSchema>>({
      resolver: zodResolver(personFormSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        contactName: "",
        contactPhone: "",
        lastSeen: "",
        identifyingDetails: "",
        notes: "",
      },
    })
    const onSubmit = (data: z.infer<typeof personFormSchema>) => {
      console.log(data)
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} dir="rtl" className="space-y-8">
          <div className="flex flex-wrap -mx-2">
            {personFields.map((field, index) => (
              <div key={field.name} className="w-1/2 px-2">
                <FormField
                  control={form.control}
                  name={field.name as keyof typeof personFormSchema._def.shape}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}></FormLabel>
                      <FormControl>
                        <Input placeholder={field.placeholder} {...formField} className="w-full p-2 border rounded"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button type="submit" className="bg-blue-500 mt-2 text-white px-4 py-2 rounded hover:bg-blue-600">שלח</Button>
          </div>
        </form>
      </Form>
    )
  }
  const AnimalForm = () => {
    const form = useForm<z.infer<typeof animalFormSchema>>({
      resolver: zodResolver(animalFormSchema),
      defaultValues: {
        name: "",
        species: "",
        breed: "",
        color: "",
        contactName: "",
        contactPhone: "",
        lastSeen: "",
        identifyingDetails: "",
        notes: "",
      },
    })
    const onSubmit = (data: z.infer<typeof animalFormSchema>) => {
      console.log(data)
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} dir="rtl" className="space-y-8">
          <div className="flex flex-wrap -mx-2">
            {animalFields.map((field, index) => (
              <div key={field.name} className="w-1/2 px-2">
                <FormField
                  control={form.control}
                  name={field.name as keyof typeof animalFormSchema._def.shape}
                  render={({ field: formField }) => (
                    <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}></FormLabel>
                      <FormControl>
                        <Input placeholder={field.placeholder} {...formField} className="w-full p-2 border rounded"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button type="submit" className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600">שלח</Button>
          </div>
        </form>
      </Form>
    )
  }
  export default function MissingPage() {
    return (
        <div dir="rtl" className="space-y-6">
        <div className="text-center py-4">
          <h3 className="text-lg font-medium">הוספת נעדר</h3>
        </div>
            <div className="p-8 rounded-lg m-auto shadow-md w-full sm:w-3/4">
            <Tabs defaultValue="person" className="w-full">
                <div className="w-full text-center"><TabsList>
                    <TabsTrigger value="person">👤</TabsTrigger>
                    <TabsTrigger value="animal">🐕</TabsTrigger>
                </TabsList>
                </div>
                <TabsContent value="person">
                    <PersonForm/>
                </TabsContent>
                <TabsContent value="animal">
                    <AnimalForm/>
                </TabsContent>
            </Tabs>
            </div>
        </div>
    )
  }

