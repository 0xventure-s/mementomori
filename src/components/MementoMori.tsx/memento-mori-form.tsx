import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function MementoMoriForm() {
  return (
    <div className="bg-black  flex items-center justify-center p-4">
      <Card className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border-zinc-800 w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center text-white">
            ¿Cuanta vida te queda?
          </h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="link" 
                className="w-full text-gray-400 hover:text-white transition-colors"
              >
                Explicacion
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-gray-300">Memento Mori</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Recuerda que morirás - Esta aplicación visualiza los meses que te quedan basado en la expectativa
                  de vida promedio de 80 años. Úsala como una herramienta de reflexión y motivación.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-300"
              >
                Ingresa tu nombre
              </label>
              <Input
                id="name"
                type="text"
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-gray-500"
                placeholder="Tu nombre"
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="birthDate" 
                className="block text-sm font-medium text-gray-300"
              >
                Fecha de Nacimiento
              </label>
              <Input
                id="birthDate"
                type="date"
                 name="begin" placeholder="dd-mm-yyyy" 
         min="1997-01-01" max="2030-12-31"
                className="bg-zinc-800/50 border-zinc-700 text-white"
                
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Crear
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}