"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Heart, Users, Headphones, Search, Filter, Menu, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProfessionalCard } from "@/components/professional-card"
import { FilterPanel } from "@/components/filter-panel"
import { MobileNav } from "@/components/mobile-nav"
import { WaveAnimation } from "@/components/wave-animation"
import { ParticleAnimation } from "@/components/particle-animation"
import { SiteFooter } from "@/components/site-footer"
import { getProfessionals } from "@/services/professional-service"

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
      staggerChildren: 0.2,
    },
  },
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [professionals, setProfessionals] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fetch professionals data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfessionals()
        setProfessionals(data)
      } catch (error) {
        console.error("Error fetching professionals:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
          isScrolled ? "bg-white/95 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="inline-block font-bold text-xl">SAVAYAS HEAL</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#counseling"
                className="flex items-center text-lg font-medium transition-colors hover:text-pink-500 relative group"
              >
                Counseling
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#relationship"
                className="flex items-center text-lg font-medium transition-colors hover:text-pink-500 relative group"
              >
                Relationship
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#listeners"
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
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <main className="flex-1">
        {/* Enhanced Hero Section with Particle Animation */}
        <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
          <ParticleAnimation />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <motion.div
                className="flex flex-col justify-center space-y-6"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <Badge variant="outline" className="w-fit border-pink-200 text-pink-500 mb-2">
                  Mental Health Support
                </Badge>
                <div className="space-y-4">
                  <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-pink-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Find Your Perfect Mental Health Professional
                  </motion.h1>
                  <motion.div
                    className="max-w-[600px] text-gray-600 md:text-xl space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p>
                      Connect with psychiatrists, relationship counselors, and active listeners who can help you
                      navigate life's challenges.
                    </p>
                    <div className="relative py-4 px-6 bg-pink-50/70 rounded-lg border border-pink-100 backdrop-blur-sm">
                      <p className="text-2xl font-semibold text-pink-700 italic">"WE don't judge, WE emphasize"</p>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className="flex flex-col gap-3 sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-300 hover:scale-105"
                  >
                    <Link href="#counseling">
                      Explore Professionals <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-pink-200 hover:bg-pink-50 transition-transform duration-300 hover:scale-105"
                  >
                    <Link href="#how-it-works">How It Works</Link>
                  </Button>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-pink-100 overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=32&width=32`}
                          width={32}
                          height={32}
                          alt={`User ${i}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">1,000+</span> people found their match this month
                  </p>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-full bg-pink-100 blur-3xl opacity-30 animate-pulse"></div>
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Mental health professionals"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-lg relative z-10"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Brand Tagline Section */}
        <section className="w-full py-12 bg-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
                Together for a healthier mind
              </h2>
              <p className="max-w-[800px] text-lg md:text-xl text-pink-100">
                Join our community of professionals and individuals committed to mental wellbeing
              </p>
            </motion.div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="w-full py-8 md:py-12 bg-white/70 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Trusted by leading organizations
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
                {["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"].map((company, i) => (
                  <div key={i} className="h-8 md:h-10">
                    <Image
                      src={`/placeholder.svg?height=40&width=120&text=${company}`}
                      width={120}
                      height={40}
                      alt={company}
                      className="h-full w-auto object-contain grayscale"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Counseling Section with Enhanced Design */}
        <section id="counseling" className="w-full py-16 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>
          <WaveAnimation className="opacity-30" />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Badge variant="outline" className="border-pink-200 text-pink-500">
                Professional Help
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">Counseling Services</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connect with licensed psychiatrists and therapists who can provide professional mental health support.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Filter panel is now handled by the updated FilterPanel component */}
              <div className="md:w-1/4">
                <FilterPanel />
              </div>

              <div className="md:w-3/4">
                <motion.div
                  className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search professionals..."
                      className="w-full bg-white pl-8 focus-visible:ring-pink-500"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 hidden md:flex whitespace-nowrap border-pink-200 hover:bg-pink-50"
                  >
                    <Filter className="h-4 w-4" />
                    Sort
                  </Button>
                </motion.div>

                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                  </div>
                ) : (
                  <motion.div
                    className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {professionals.slice(0, 3).map((professional) => (
                      <motion.div key={professional.id} variants={fadeIn}>
                        <ProfessionalCard {...professional} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                <motion.div
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    asChild
                    className="bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-300 hover:scale-105"
                  >
                    <Link href="/professionals">
                      View More Professionals <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Relationship Section with Enhanced Design */}
        <section id="relationship" className="w-full py-16 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-pink-50/70 backdrop-blur-sm z-0"></div>
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-100/30 rounded-l-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200/20 rounded-full filter blur-3xl"></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Badge variant="outline" className="border-pink-200 text-pink-500">
                Relationship Support
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">Relationship Counseling</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Work with specialized therapists to improve communication and strengthen your relationships.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : (
              <motion.div
                className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {professionals
                  .filter((pro) => pro.title.includes("Relationship") || pro.specialties?.includes("Relationships"))
                  .slice(0, 3)
                  .map((professional) => (
                    <motion.div key={professional.id} variants={fadeIn}>
                      <ProfessionalCard {...professional} />
                    </motion.div>
                  ))}
              </motion.div>
            )}

            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                className="bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-300 hover:scale-105"
              >
                <Link href="/professionals">
                  View More Relationship Counselors <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Listeners Section with Enhanced Design */}
        <section id="listeners" className="w-full py-16 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>
          <WaveAnimation className="opacity-20" />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Badge variant="outline" className="border-pink-200 text-pink-500">
                Emotional Support
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">Active Listeners</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connect with compassionate listeners who provide a safe space for you to express yourself.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : (
              <motion.div
                className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {professionals
                  .filter((pro) => pro.title.includes("Listener"))
                  .slice(0, 3)
                  .map((professional) => (
                    <motion.div key={professional.id} variants={fadeIn}>
                      <ProfessionalCard {...professional} />
                    </motion.div>
                  ))}
              </motion.div>
            )}

            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                className="bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-300 hover:scale-105"
              >
                <Link href="/professionals">
                  View More Listeners <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section with Enhanced Design */}
        <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-pink-50/60 backdrop-blur-sm z-0"></div>
          <div className="absolute inset-0 z-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Badge variant="outline" className="border-pink-200 text-pink-500">
                Simple Process
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">How SAVAYAS HEAL Works</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple steps to connect with the right mental health professional for your needs.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <Card className="border-pink-100 bg-white/90 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-pink-50 rounded-br-full z-0"></div>
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <CardContent className="pt-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <Search className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-pink-800">Browse Professionals</h3>
                      <p className="text-gray-600">
                        Explore our directory of licensed psychiatrists, therapists, and active listeners.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <Card className="border-pink-100 bg-white/90 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-pink-50 rounded-br-full z-0"></div>
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <CardContent className="pt-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <Filter className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-pink-800">Filter & Match</h3>
                      <p className="text-gray-600">
                        Use our advanced filters to find the perfect match for your specific needs.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <Card className="border-pink-100 bg-white/90 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-pink-50 rounded-br-full z-0"></div>
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <CardContent className="pt-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-pink-800">Book a Session</h3>
                      <p className="text-gray-600">
                        Schedule an appointment at a time that works best for your schedule.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <Card className="border-pink-100 bg-white/90 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-pink-50 rounded-br-full z-0"></div>
                  <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <CardContent className="pt-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <Headphones className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-pink-800">Connect & Heal</h3>
                      <p className="text-gray-600">
                        Meet virtually or in-person and begin your journey toward better mental health.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>
          <ParticleAnimation className="opacity-30" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-full bg-pink-100 blur-3xl opacity-20"></div>
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Mental health support"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-lg relative z-10"
                />
              </motion.div>
              <motion.div
                className="flex flex-col justify-center space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <Badge variant="outline" className="w-fit border-pink-200 text-pink-500">
                  Join Our Community
                </Badge>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-pink-800">
                    Begin Your Healing Journey Today
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Take the first step toward better mental health. Our professionals are ready to support you through
                    life's challenges.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-300 hover:scale-105"
                  >
                    <Link href="/signup">Sign Up Now</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-pink-200 hover:bg-pink-50 transition-transform duration-300 hover:scale-105"
                  >
                    <Link href="/professionals/join">Join as Professional</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

