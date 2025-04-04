"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Upload, CheckCircle } from "lucide-react"
import { useState } from "react"
import { WaveAnimation } from "@/components/wave-animation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

export default function JoinAsProfessionalPage() {
  const [formStep, setFormStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleNextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>
          <WaveAnimation className="opacity-20" />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="space-y-2">
                <Badge variant="outline" className="border-pink-200 text-pink-500">
                  Join Our Network
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">
                  Join SAVAYAS as a Professional
                </h1>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Share your expertise and help people navigate life's challenges. Join our network of mental health
                  professionals.
                </p>
              </div>
            </motion.div>

            {formSubmitted ? (
              <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-pink-100 bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                    <div className="h-20 w-20 rounded-full bg-pink-100 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-pink-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-pink-800">Application Submitted Successfully!</h2>
                    <p className="text-gray-600 max-w-lg">
                      Thank you for your interest in joining SAVAYAS. Our team will review your application and get back
                      to you within 2-3 business days.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button asChild className="bg-pink-500 hover:bg-pink-600">
                        <Link href="/">Return to Home</Link>
                      </Button>
                      <Button asChild variant="outline" className="border-pink-200 hover:bg-pink-50">
                        <Link href="/contact">Contact Support</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-pink-100 bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-pink-800">
                          {formStep === 1 && "Personal Information"}
                          {formStep === 2 && "Professional Details"}
                          {formStep === 3 && "Services & Availability"}
                        </h2>
                        <Badge variant="outline" className="border-pink-200 text-pink-500">
                          Step {formStep} of 3
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-pink-500 h-full transition-all duration-300 ease-in-out"
                          style={{ width: `${(formStep / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {formStep === 1 && (
                        <motion.div
                          className="space-y-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="first-name">First Name</Label>
                              <Input id="first-name" placeholder="Enter your first name" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" placeholder="Enter your last name" required />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email address" required />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="City, State" required />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="photo">Profile Photo</Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-500">Drag and drop your photo here, or click to browse</p>
                              <Input id="photo" type="file" className="hidden" />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2 border-pink-200 hover:bg-pink-50"
                              >
                                Upload Photo
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {formStep === 2 && (
                        <motion.div
                          className="space-y-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="space-y-2">
                            <Label htmlFor="professional-type">Professional Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your professional type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                                <SelectItem value="psychologist">Psychologist</SelectItem>
                                <SelectItem value="therapist">Therapist</SelectItem>
                                <SelectItem value="counselor">Counselor</SelectItem>
                                <SelectItem value="listener">Active Listener</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="specialties">Specialties</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="anxiety"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="anxiety" className="text-sm">
                                  Anxiety
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="depression"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="depression" className="text-sm">
                                  Depression
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="relationships"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="relationships" className="text-sm">
                                  Relationships
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="trauma"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="trauma" className="text-sm">
                                  Trauma & PTSD
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="stress"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="stress" className="text-sm">
                                  Stress Management
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="addiction"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="addiction" className="text-sm">
                                  Addiction
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="education">Education & Credentials</Label>
                            <Textarea
                              id="education"
                              placeholder="List your degrees, certifications, and credentials"
                              className="min-h-[100px]"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select years of experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-2">0-2 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="6-10">6-10 years</SelectItem>
                                <SelectItem value="11-15">11-15 years</SelectItem>
                                <SelectItem value="15+">15+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="license">License Number</Label>
                            <Input id="license" placeholder="Enter your professional license number" required />
                          </div>
                        </motion.div>
                      )}

                      {formStep === 3 && (
                        <motion.div
                          className="space-y-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="space-y-2">
                            <Label htmlFor="session-types">Session Types</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="video"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="video" className="text-sm">
                                  Video Call
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="phone"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="phone" className="text-sm">
                                  Phone Call
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="in-person"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="in-person" className="text-sm">
                                  In-Person
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="languages">Languages</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="english"
                                  defaultChecked
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="english" className="text-sm">
                                  English
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="hindi"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="hindi" className="text-sm">
                                  Hindi
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="tamil"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="tamil" className="text-sm">
                                  Tamil
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="telugu"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="telugu" className="text-sm">
                                  Telugu
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="bengali"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="bengali" className="text-sm">
                                  Bengali
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="session-fee">Session Fee (₹)</Label>
                            <Input id="session-fee" type="number" placeholder="Enter your fee per session" required />
                            <p className="text-xs text-gray-500">Enter amount in Indian Rupees (₹)</p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="availability">Availability</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="weekdays"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="weekdays" className="text-sm">
                                  Weekdays
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="weekends"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="weekends" className="text-sm">
                                  Weekends
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="mornings"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="mornings" className="text-sm">
                                  Mornings
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="evenings"
                                  className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                />
                                <label htmlFor="evenings" className="text-sm">
                                  Evenings
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">Professional Bio</Label>
                            <Textarea
                              id="bio"
                              placeholder="Write a brief description about yourself and your approach to therapy"
                              className="min-h-[150px]"
                              required
                            />
                          </div>

                          <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                              id="terms"
                              required
                              className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                              I agree to the{" "}
                              <Link href="/terms" className="text-pink-500 hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-pink-500 hover:underline">
                                Privacy Policy
                              </Link>
                            </label>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex justify-between pt-4">
                        {formStep > 1 ? (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrevStep}
                            className="border-pink-200 hover:bg-pink-50"
                          >
                            Previous
                          </Button>
                        ) : (
                          <div></div>
                        )}

                        {formStep < 3 ? (
                          <Button type="button" onClick={handleNextStep} className="bg-pink-500 hover:bg-pink-600">
                            Next
                          </Button>
                        ) : (
                          <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                            Submit Application
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-pink-50/80 backdrop-blur-sm py-6 md:py-12 relative">
        <WaveAnimation className="opacity-10" />
        <div className="container px-4 md:px-6 relative z-10">
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

