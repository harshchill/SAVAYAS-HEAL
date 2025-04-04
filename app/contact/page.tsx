"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Mail, Phone, MapPin, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

export default function ContactPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">Contact Us</h1>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions or need assistance? We're here to help. Reach out to our team.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tighter text-pink-800">Get in Touch</h2>
                    <p className="mt-2 text-gray-600">
                      Fill out the form and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
                    <motion.div variants={fadeIn} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-pink-800">Email</h3>
                        <p className="text-sm text-gray-600">contact@savayas.com</p>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeIn} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-pink-800">Phone</h3>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeIn} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-pink-800">Office</h3>
                        <p className="text-sm text-gray-600">123 Wellness Street, San Francisco, CA 94103</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <div className="rounded-lg border border-pink-100 p-6 bg-pink-50">
                    <h3 className="text-lg font-medium text-pink-800 mb-3">For Professionals</h3>
                    <p className="text-gray-600 mb-4">
                      Interested in joining our network of mental health professionals? We'd love to hear from you.
                    </p>
                    <Button
                      asChild
                      className="bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-300 hover:scale-105"
                    >
                      <Link href="/professionals/join">Join as a Professional</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-lg border border-pink-100 p-6 shadow-sm"
              >
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <Input id="first-name" placeholder="John" className="focus-visible:ring-pink-500" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <Input id="last-name" placeholder="Doe" className="focus-visible:ring-pink-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="focus-visible:ring-pink-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone (optional)
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="focus-visible:ring-pink-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" className="focus-visible:ring-pink-500" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      className="min-h-[120px] focus-visible:ring-pink-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-300 hover:scale-105"
                  >
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-pink-800">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-lg">
                  Find answers to common questions about SAVAYAS and our services.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:gap-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={fadeIn} className="space-y-2">
                <h3 className="text-xl font-bold text-pink-800">How do I choose the right professional?</h3>
                <p className="text-gray-600">
                  Our platform provides detailed profiles, specialties, and reviews to help you find the right match.
                  You can also use our filters to narrow down professionals based on your specific needs.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="space-y-2">
                <h3 className="text-xl font-bold text-pink-800">What are the session costs?</h3>
                <p className="text-gray-600">
                  Session costs vary depending on the professional's expertise and the type of service. Each
                  professional sets their own rates, which are clearly displayed on their profiles.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="space-y-2">
                <h3 className="text-xl font-bold text-pink-800">Is my information confidential?</h3>
                <p className="text-gray-600">
                  Absolutely. We take privacy very seriously. All communications and personal information are protected
                  with enterprise-grade security and encryption.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="space-y-2">
                <h3 className="text-xl font-bold text-pink-800">How do I schedule a session?</h3>
                <p className="text-gray-600">
                  Once you've found a professional you'd like to work with, you can book a session directly through
                  their profile page by selecting an available time slot that works for you.
                </p>
              </motion.div>
            </motion.div>
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

