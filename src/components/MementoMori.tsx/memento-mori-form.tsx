"use client"
import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Camera } from "lucide-react"
import html2canvas from 'html2canvas'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMementoStore } from "@/store/mementoStore"

export default function MementoMori() {
  const [localError, setLocalError] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)
  
  const {
    name,
    birthDate,
    showResult,
    remainingMonths,
    livedMonths,
    setName,
    setBirthDate,
    calculateMonths,
    setShowResult,
    clearAll
  } = useMementoStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!name || name.length < 2) {
      return setLocalError('El nombre debe tener al menos 2 caracteres')
    }
    
    if (!birthDate) {
      return setLocalError('Selecciona tu fecha de nacimiento')
    }

    const birthDateObj = new Date(birthDate)
    if (birthDateObj > new Date()) {
      return setLocalError('La fecha de nacimiento no puede ser futura')
    }

    calculateMonths()
  }

  const downloadAsImage = async () => {
    if (!resultRef.current) return
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#000000',
        scale: 2
      })
      
      const link = document.createElement('a')
      link.download = `memento-mori-${name}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error al generar la imagen:', error)
    }
  }

  return (
    <div className="bg-black  flex items-center justify-center p-4">
      <Card className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border-zinc-800 w-full max-w-xl lg:max-w-4xl">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center text-white">
            ¿Cuánta vida te queda?
          </h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="link" 
                className="w-full text-gray-400 hover:text-white transition-colors"
              >
                Explicación
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
          {localError && (
            <div className="text-red-400 text-sm text-center p-2 border border-red-800/50 rounded-lg mb-4">
              {localError}
            </div>
          )}

          {!showResult ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-gray-500"
                  placeholder="Tu nombre"
                  required
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
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="bg-zinc-800/50 border-zinc-700 text-white"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
              >
                Crear
              </Button>
            </form>
          ) : (
            <div ref={resultRef} className="space-y-6 p-4">
              <h2 className="text-xl text-center text-gray-300">
                {name}, te quedan {remainingMonths} meses de {80 * 12}
              </h2>
              
              <div className="grid grid-cols-12 md:grid-cols-24 gap-1.5">
                {Array.from({ length: 80 * 12 }).map((_, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-full border ${
                      index < livedMonths 
                        ? "bg-white border-transparent" 
                        : "border-zinc-700"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowResult(false)}
                  className="flex-1 bg-white text-black hover:bg-gray-200"
                >
                  Volver
                </Button>
                <Button
                  onClick={downloadAsImage}
                  className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
                <Button 
                  onClick={clearAll}
                  className="flex-1 bg-red-500 text-white hover:bg-red-600"
                >
                  Reiniciar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}