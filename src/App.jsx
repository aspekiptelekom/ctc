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
import { useState } from "react"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"

const formSchema = z.object({
  aLegNumber: z.string().min(1, {
    message: "Lütfen bir SIM kart seçin",
  }).max(20),
  extensionNo: z.string().min(1, {
    message: "Personel numarası boş olamaz",
  }).max(20, {
    message: "Personel numarası en fazla 20 karakter olabilir",
  }),
  bLegNumber: z.string().min(1, {
    message: "Müşteri numarası boş olamaz",
  }).max(20, {
    message: "Müşteri numarası en fazla 20 karakter olabilir",
  }),
  customId: z.string().min(1, {
    message: "Özel ID boş olamaz",
  }).max(50, {
    message: "Özel ID en fazla 50 karakter olabilir",
  }),
})

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aLegNumber: "",
      extensionNo: "",
      bLegNumber: "",
      customId: Math.random().toString(36).substring(2, 15),
    },
  })

  async function onSubmit(values) {
    setIsLoading(true);
    toast.dismiss();
    try {
      const response = await axios.post('http://172.19.5.49/Caller/ClickToCall', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data.Data.clicktocallv3.description);
      toast.success(response.data.Data.clicktocallv3.description);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error('Arama başlatılamadı. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.', {
          duration: Infinity,
          dismissible: true
        });
      } else {
        toast.error('Network Error: Sunucuya bağlanırken bir hata oluştu.', {
          duration: Infinity,
          dismissible: true
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col gap-10 justify-center items-center">
      <h1 className=" text-xl md:text-3xl font-bold">Click to Call DEMO</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-80">

          <FormField
            control={form.control}
            name="aLegNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SIM</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(String(value))}
                    defaultValue={String(field.value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="SIM kartını seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>SIM Seçenekleri</SelectLabel>
                        <SelectItem value="05529629870">SIM 1 (05529629870)</SelectItem>
                        <SelectItem value="here">SIM 2 (here)</SelectItem>
                        <SelectItem value="here2">SIM 3 (here)</SelectItem>
                        <SelectItem value="here3">SIM 4 (here)</SelectItem>
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
            name="extensionNo"
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
            name="bLegNumber"
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
          <FormField
            control={form.control}
            name="customId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Özel ID</FormLabel>
                <FormControl>
                  <Input placeholder="Özel ID girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className=" w-full">{isLoading ? <Loader2 className="animate-spin" /> : "Ara"}</Button>
        </form>
      </Form>
    </div>
  )
}