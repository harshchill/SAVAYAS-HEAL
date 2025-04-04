"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Search, Filter, SlidersHorizontal, Grid, List, ChevronDown, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProfessionalCard } from "@/components/professional-card"
import { FilterPanel } from "@/components/filter-panel"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SiteFooter } from "@/components/site-footer"
import { getProfessionals, type Professional } from "@/services/professional-service"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ProfessionalsListPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("recommended")
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<{
    type?: string[]
    specialty?: string[]
    priceRange?: [number, number]
  }>({})

  // Fetch professionals data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getProfessionals()
        setProfessionals(data)
        setFilteredProfessionals(data)
      } catch (error) {
        console.error("Error fetching professionals:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Combined effect for filtering and sorting
  useEffect(() => {
    let result = [...professionals]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (pro) =>
          pro.name.toLowerCase().includes(query) ||
          pro.title.toLowerCase().includes(query) ||
          pro.specialty.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        result.sort((a, b) => b.reviews - a.reviews)
        break
      // Default is "recommended" - no sorting needed
    }

    setFilteredProfessionals(result)
  }, [professionals, searchQuery, sortOption])

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    // Only update if filters have actually changed
    if (JSON.stringify(filters) === JSON.stringify(activeFilters)) {
      return
    }

    setActiveFilters(filters)

    let filtered = [...professionals]

    // Apply type filter
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter((pro) =>
        filters.type.some((type: string) => pro.title.toLowerCase().includes(type.toLowerCase())),
      )
    }

    // Apply specialty filter
    if (filters.specialty && filters.specialty.length > 0) {
      filtered = filtered.filter((pro) =>
        pro.specialties?.some((specialty) => filters.specialty.includes(specialty.toLowerCase())),
      )
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      filtered = filtered.filter((pro) => pro.price >= min && pro.price <= max)
    }

    setFilteredProfessionals(filtered)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({})
    setFilteredProfessionals(professionals)
    setSearchQuery("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 shadow-sm">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="inline-block font-bold text-xl">SAVAYAS HEAL</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/#counseling"
                className="flex items-center text-lg font-medium transition-colors hover:text-pink-500 relative group"
              >
                Counseling
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/#relationship"
                className="flex items-center text-lg font-medium transition-colors hover:text-pink-500 relative group"
              >
                Relationship
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/#listeners"
                className="flex items-center text-lg font-medium transition-colors hover:text-pink-500 relative group"
              >
                Listeners
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/about"
                className="flex items-center text-lg font-medium transition-colors hover:text-pink-500 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center text-lg font-medium transition-colors hover:text-pink-500 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="hidden md:flex items-center space-x-2">
              <Button asChild variant="ghost" className="text-base hover:bg-pink-50 hover:text-pink-500">
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild className="bg-pink-500 text-white hover:bg-pink-600">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
            <Button asChild variant="outline" className="hidden md:flex border-pink-200 hover:bg-pink-50">
              <Link href="/professionals/join">Join as Professional</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-pink-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="space-y-2">
                <Badge variant="outline" className="border-pink-200 text-pink-500">
                  Find Your Match
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-pink-800">
                  Browse All Professionals
                </h1>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover and connect with our network of qualified mental health professionals.
                </p>
              </div>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Filter panel for desktop */}
              <div className="md:w-1/4 hidden md:block">
                <FilterPanel onFilterChange={handleFilterChange} activeFilters={activeFilters} />
              </div>

              <div className="md:w-3/4">
                <div className="flex flex-col gap-4 mb-6">
                  {/* Search and filter controls */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Search professionals..."
                        className="w-full bg-white pl-8 focus-visible:ring-pink-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Mobile filter button */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm" className="md:hidden border-pink-200 hover:bg-pink-50">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                          <div className="py-4">
                            <FilterPanel onFilterChange={handleFilterChange} activeFilters={activeFilters} />
                          </div>
                        </SheetContent>
                      </Sheet>

                      {/* Sort dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50">
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Sort
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSortOption("recommended")}>Recommended</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortOption("price-low")}>
                            Price: Low to High
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortOption("price-high")}>
                            Price: High to Low
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortOption("rating")}>Highest Rated</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSortOption("reviews")}>Most Reviews</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* View mode toggle */}
                      <div className="flex border rounded-md overflow-hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`px-2 rounded-none ${viewMode === "grid" ? "bg-pink-50 text-pink-500" : ""}`}
                          onClick={() => setViewMode("grid")}
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`px-2 rounded-none ${viewMode === "list" ? "bg-pink-50 text-pink-500" : ""}`}
                          onClick={() => setViewMode("list")}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Results count and active filters */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm text-gray-600">
                      Showing <span className="font-medium">{filteredProfessionals.length}</span> professionals
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(activeFilters).flatMap(([filterType, values]) => {
                        if (!values || (Array.isArray(values) && values.length === 0)) return []

                        if (filterType === "priceRange") {
                          const [min, max] = values as [number, number]
                          return [
                            <Badge key="price" variant="secondary" className="bg-pink-50 hover:bg-pink-100">
                              ₹{min} - ₹{max}{" "}
                              <button
                                className="ml-1 text-xs"
                                onClick={() => {
                                  const newFilters = { ...activeFilters }
                                  delete newFilters.priceRange
                                  handleFilterChange(newFilters)
                                }}
                              >
                                ×
                              </button>
                            </Badge>,
                          ]
                        }

                        return (values as string[]).map((value) => (
                          <Badge key={value} variant="secondary" className="bg-pink-50 hover:bg-pink-100">
                            {value}{" "}
                            <button
                              className="ml-1 text-xs"
                              onClick={() => {
                                const newValues = (
                                  activeFilters[filterType as keyof typeof activeFilters] as string[]
                                ).filter((v) => v !== value)
                                handleFilterChange({
                                  ...activeFilters,
                                  [filterType]: newValues.length ? newValues : undefined,
                                })
                              }}
                            >
                              ×
                            </button>
                          </Badge>
                        ))
                      })}

                      {(Object.keys(activeFilters).length > 0 || searchQuery) && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-5 p-0 text-pink-500 hover:text-pink-600"
                          onClick={clearAllFilters}
                        >
                          Clear all
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Loading state */}
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                  </div>
                ) : (
                  <>
                    {/* Professionals grid/list view */}
                    {filteredProfessionals.length > 0 ? (
                      <motion.div
                        className={
                          viewMode === "grid"
                            ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "flex flex-col gap-4"
                        }
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {filteredProfessionals.map((professional) => (
                          <motion.div key={professional.id} variants={fadeIn}>
                            {viewMode === "grid" ? (
                              <ProfessionalCard {...professional} />
                            ) : (
                              <div className="flex flex-col sm:flex-row gap-4 border border-pink-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="sm:w-1/4 flex-shrink-0">
                                  <div className="aspect-square w-full sm:w-auto max-w-[150px] mx-auto overflow-hidden rounded-lg">
                                    <img
                                      src={professional.imageSrc || "/placeholder.svg"}
                                      alt={professional.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                </div>
                                <div className="flex-1 flex flex-col">
                                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                    <div>
                                      <h3 className="font-bold text-lg text-pink-800">{professional.name}</h3>
                                      <p className="text-sm text-gray-600">{professional.title}</p>
                                    </div>
                                    <Badge variant="outline" className="border-pink-200 text-pink-500">
                                      ₹{professional.price}/hr
                                    </Badge>
                                  </div>
                                  <p className="text-sm font-medium mb-2">Specializes in: {professional.specialty}</p>
                                  <div className="flex items-center gap-1 mb-4">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium">{professional.rating}</span>
                                    <span className="text-sm text-gray-600">({professional.reviews} reviews)</span>
                                  </div>
                                  <div className="mt-auto">
                                    <Button
                                      asChild
                                      className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 transition-transform duration-200 hover:scale-105"
                                    >
                                      <Link href={`/professional/${professional.id}`}>Book Session</Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">No professionals match your search criteria.</p>
                        <Button
                          variant="outline"
                          onClick={clearAllFilters}
                          className="border-pink-200 hover:bg-pink-50"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}

                    {/* Pagination */}
                    {filteredProfessionals.length > 0 && (
                      <div className="flex justify-center mt-8">
                        <nav className="flex items-center gap-1">
                          <Button variant="outline" size="sm" disabled className="border-pink-200 hover:bg-pink-50">
                            Previous
                          </Button>
                          <Button variant="outline" size="sm" className="border-pink-200 bg-pink-50 text-pink-500">
                            1
                          </Button>
                          <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50">
                            2
                          </Button>
                          <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50">
                            3
                          </Button>
                          <span className="px-2 text-gray-500">...</span>
                          <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50">
                            10
                          </Button>
                          <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50">
                            Next
                          </Button>
                        </nav>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

