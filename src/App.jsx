import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  sim: z.number().min(1).max(2),
  personnelNumber: z.string().min(1, {
    message: "Personel numarası boş olamaz",
  }).max(20, {
    message: "Personel numarası en fazla 20 karakter olabilir",
  }),
  clientNumber: z.string().min(1, {
    message: "Müşteri numarası boş olamaz",
  }).max(20, {
    message: "Müşteri numarası en fazla 20 karakter olabilir",
  }),
})

export default function App() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sim: 1,
      personnelNumber: "",
      clientNumber: "",
    },
  })

  function onSubmit(values) {
    console.log(values)
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-80">

          <FormField
            control={form.control}
            name="sim"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SIM</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="SIM kartını seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>SIM Seçenekleri</SelectLabel>
                        <SelectItem value="1">SIM 1 ()</SelectItem>
                        <SelectItem value="2">SIM 2 ()</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Kullanılacak SIM kartını seçin.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personnelNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personel Numarası</FormLabel>
                <FormControl>
                  <Input hideControls placeholder="Personel numarasını girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Müşteri Numarası</FormLabel>
                <FormControl>
                  <Input placeholder="Müşteri numarasını girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className=" w-full">Ara</Button>
        </form>
      </Form>
    </div>
  )
}