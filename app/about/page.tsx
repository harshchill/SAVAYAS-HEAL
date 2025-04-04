"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Users, Award, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-pink-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">About SAVAYAS</h1>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our mission is to make mental health support accessible to everyone, connecting people with the right
                  professionals for their needs.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Our story"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-lg"
                />
              </motion.div>
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-pink-800">Our Story</h2>
                  <p className="text-gray-600 md:text-lg">
                    SAVAYAS was founded in 2023 with a simple yet powerful vision: to break down barriers to mental
                    health care. Our founder, after experiencing firsthand the challenges of finding the right mental
                    health support, decided to create a platform that makes the process simple, accessible, and
                    personalized.
                  </p>
                  <p className="text-gray-600 md:text-lg mt-4">
                    Today, SAVAYAS connects thousands of individuals with licensed psychiatrists, relationship
                    counselors, and active listeners who provide compassionate support for a wide range of mental health
                    needs.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">Our Values</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The principles that guide everything we do at SAVAYAS.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <Card className="border-pink-100 bg-white h-full">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <Heart className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-pink-800">Compassion</h3>
                      <p className="text-gray-600">
                        We approach every individual with empathy and understanding, recognizing that each person's
                        journey is unique.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <Card className="border-pink-100 bg-white h-full">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <Award className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-pink-800">Excellence</h3>
                      <p className="text-gray-600">
                        We are committed to maintaining the highest standards of quality in our platform and the
                        professionals we partner with.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <Card className="border-pink-100 bg-white h-full">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-pink-800">Inclusivity</h3>
                      <p className="text-gray-600">
                        We believe mental health support should be accessible to everyone, regardless of background or
                        circumstances.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">Why Choose SAVAYAS</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  What sets us apart from other mental health platforms.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={fadeIn} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-pink-800">Verified Professionals</h3>
                  <p className="text-gray-600">
                    All our mental health professionals undergo a rigorous verification process to ensure they have the
                    proper credentials and experience.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-pink-800">Personalized Matching</h3>
                  <p className="text-gray-600">
                    Our advanced matching algorithm helps you find professionals who specialize in your specific needs
                    and preferences.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-pink-800">Flexible Options</h3>
                  <p className="text-gray-600">
                    Choose from a variety of session formats including video calls, phone calls, or in-person meetings
                    based on your comfort level.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-pink-800">Secure & Confidential</h3>
                  <p className="text-gray-600">
                    Your privacy is our priority. All communications and personal information are protected with
                    enterprise-grade security.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-pink-800">Join Our Community</h2>
                  <p className="text-gray-600 md:text-lg">
                    Whether you're seeking support or you're a mental health professional looking to make a difference,
                    SAVAYAS welcomes you to our growing community dedicated to mental wellbeing.
                  </p>
                  <div className="flex flex-col gap-2 pt-4 sm:flex-row">
                    <Button
                      asChild
                      size="lg"
                      className="bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-300 hover:scale-105"
                    >
                      <Link href="/signup">Sign Up as a Client</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-pink-200 hover:bg-pink-50 transition-transform duration-300 hover:scale-105"
                    >
                      <Link href="/professionals/join">Join as a Professional</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Join our community"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-pink-50 py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="inline-block font-bold text-xl">SAVAYAS</span>
              </Link>
              <p className="text-sm text-gray-600">Connecting you with mental health professionals who care.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-pink-800">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/#counseling" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Counseling
                  </Link>
                </li>
                <li>
                  <Link href="/#relationship" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Relationship Therapy
                  </Link>
                </li>
                <li>
                  <Link href="/#listeners" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Active Listeners
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-pink-800">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-pink-800">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-pink-200 pt-6">
            <p className="text-center text-sm text-gray-600">
              © {new Date().getFullYear()} SAVAYAS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

