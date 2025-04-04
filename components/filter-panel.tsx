"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface FilterPanelProps {
  onFilterChange?: (filters: any) => void
  activeFilters?: any
}

export function FilterPanel({ onFilterChange, activeFilters = {} }: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState([500, 5000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  // Initialize from activeFilters
  useEffect(() => {
    // Only update if values are different to prevent infinite loops
    if (
      activeFilters.priceRange &&
      (priceRange[0] !== activeFilters.priceRange[0] || priceRange[1] !== activeFilters.priceRange[1])
    ) {
      setPriceRange(activeFilters.priceRange)
    }

    // For arrays, check if they're different before updating
    const typesChanged = !arraysEqual(selectedTypes, activeFilters.type || [])
    if (activeFilters.type && typesChanged) {
      setSelectedTypes(activeFilters.type)
    }

    const specialtiesChanged = !arraysEqual(selectedSpecialties, activeFilters.specialty || [])
    if (activeFilters.specialty && specialtiesChanged) {
      setSelectedSpecialties(activeFilters.specialty)
    }

    const availabilityChanged = !arraysEqual(selectedAvailability, activeFilters.availability || [])
    if (activeFilters.availability && availabilityChanged) {
      setSelectedAvailability(activeFilters.availability)
    }

    const languagesChanged = !arraysEqual(selectedLanguages, activeFilters.language || [])
    if (activeFilters.language && languagesChanged) {
      setSelectedLanguages(activeFilters.language)
    }
  }, [activeFilters, priceRange, selectedTypes, selectedSpecialties, selectedAvailability, selectedLanguages])

  // Add a helper function to compare arrays
  function arraysEqual(a: any[], b: any[]) {
    if (a.length !== b.length) return false
    return a.every((val, index) => val === b[index])
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes((prev) => [...prev, type])
    } else {
      setSelectedTypes((prev) => prev.filter((t) => t !== type))
    }
  }

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecialties((prev) => [...prev, specialty])
    } else {
      setSelectedSpecialties((prev) => prev.filter((s) => s !== specialty))
    }
  }

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    if (checked) {
      setSelectedAvailability((prev) => [...prev, availability])
    } else {
      setSelectedAvailability((prev) => prev.filter((a) => a !== availability))
    }
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages((prev) => [...prev, language])
    } else {
      setSelectedLanguages((prev) => prev.filter((l) => l !== language))
    }
  }

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        type: selectedTypes.length > 0 ? selectedTypes : undefined,
        specialty: selectedSpecialties.length > 0 ? selectedSpecialties : undefined,
        priceRange: priceRange,
        availability: selectedAvailability.length > 0 ? selectedAvailability : undefined,
        language: selectedLanguages.length > 0 ? selectedLanguages : undefined,
      })
    }
  }

  const handleResetFilters = () => {
    setPriceRange([500, 5000])
    setSelectedTypes([])
    setSelectedSpecialties([])
    setSelectedAvailability([])
    setSelectedLanguages([])

    if (onFilterChange) {
      onFilterChange({})
    }
  }

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg text-pink-800">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-pink-500 hover:text-pink-600 hover:bg-pink-50 px-2"
          onClick={handleResetFilters}
        >
          Reset All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["type", "specialty", "price"]}>
        <AccordionItem value="type" className="border-b border-pink-100">
          <AccordionTrigger className="py-3 text-pink-800 hover:text-pink-600 hover:no-underline">
            Professional Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="psychiatrist"
                  checked={selectedTypes.includes("psychiatrist")}
                  onCheckedChange={(checked) => handleTypeChange("psychiatrist", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="psychiatrist"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Psychiatrist
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="psychologist"
                  checked={selectedTypes.includes("psychologist")}
                  onCheckedChange={(checked) => handleTypeChange("psychologist", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="psychologist"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Psychologist
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="therapist"
                  checked={selectedTypes.includes("therapist")}
                  onCheckedChange={(checked) => handleTypeChange("therapist", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="therapist"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Therapist
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="counselor"
                  checked={selectedTypes.includes("counselor")}
                  onCheckedChange={(checked) => handleTypeChange("counselor", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="counselor"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Counselor
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="listener"
                  checked={selectedTypes.includes("listener")}
                  onCheckedChange={(checked) => handleTypeChange("listener", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="listener"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active Listener
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specialty" className="border-b border-pink-100">
          <AccordionTrigger className="py-3 text-pink-800 hover:text-pink-600 hover:no-underline">
            Specialty
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anxiety"
                  checked={selectedSpecialties.includes("anxiety")}
                  onCheckedChange={(checked) => handleSpecialtyChange("anxiety", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="anxiety"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Anxiety
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="depression"
                  checked={selectedSpecialties.includes("depression")}
                  onCheckedChange={(checked) => handleSpecialtyChange("depression", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="depression"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Depression
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="relationships"
                  checked={selectedSpecialties.includes("relationships")}
                  onCheckedChange={(checked) => handleSpecialtyChange("relationships", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="relationships"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Relationships
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="trauma"
                  checked={selectedSpecialties.includes("trauma")}
                  onCheckedChange={(checked) => handleSpecialtyChange("trauma", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="trauma"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Trauma & PTSD
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stress"
                  checked={selectedSpecialties.includes("stress")}
                  onCheckedChange={(checked) => handleSpecialtyChange("stress", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="stress"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Stress Management
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b border-pink-100">
          <AccordionTrigger className="py-3 text-pink-800 hover:text-pink-600 hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[500, 5000]}
                max={10000}
                min={0}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability" className="border-b border-pink-100">
          <AccordionTrigger className="py-3 text-pink-800 hover:text-pink-600 hover:no-underline">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weekdays"
                  checked={selectedAvailability.includes("weekdays")}
                  onCheckedChange={(checked) => handleAvailabilityChange("weekdays", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="weekdays"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Weekdays
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weekends"
                  checked={selectedAvailability.includes("weekends")}
                  onCheckedChange={(checked) => handleAvailabilityChange("weekends", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="weekends"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Weekends
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="evenings"
                  checked={selectedAvailability.includes("evenings")}
                  onCheckedChange={(checked) => handleAvailabilityChange("evenings", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="evenings"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Evenings
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mornings"
                  checked={selectedAvailability.includes("mornings")}
                  onCheckedChange={(checked) => handleAvailabilityChange("mornings", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="mornings"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mornings
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="language" className="border-b-0">
          <AccordionTrigger className="py-3 text-pink-800 hover:text-pink-600 hover:no-underline">
            Language
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="english"
                  checked={selectedLanguages.includes("english")}
                  onCheckedChange={(checked) => handleLanguageChange("english", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="english"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  English
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hindi"
                  checked={selectedLanguages.includes("hindi")}
                  onCheckedChange={(checked) => handleLanguageChange("hindi", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="hindi"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hindi
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tamil"
                  checked={selectedLanguages.includes("tamil")}
                  onCheckedChange={(checked) => handleLanguageChange("tamil", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="tamil"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tamil
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="telugu"
                  checked={selectedLanguages.includes("telugu")}
                  onCheckedChange={(checked) => handleLanguageChange("telugu", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="telugu"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Telugu
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bengali"
                  checked={selectedLanguages.includes("bengali")}
                  onCheckedChange={(checked) => handleLanguageChange("bengali", checked as boolean)}
                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor="bengali"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Bengali
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        className="w-full mt-4 bg-pink-500 hover:bg-pink-600 transition-transform duration-200 hover:scale-105"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  )

  // Desktop version
  return (
    <>
      {/* Desktop Filter Panel */}
      <motion.div
        className="rounded-lg border border-pink-100 bg-white p-4 sticky top-24 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FilterContent />
      </motion.div>

      {/* Mobile Filter Button and Sheet */}
      <div className="md:hidden w-full mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full border-pink-200 flex items-center justify-center gap-2">
              <ChevronDown className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-xl pt-6">
            <div className="max-h-full overflow-y-auto pb-20">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

