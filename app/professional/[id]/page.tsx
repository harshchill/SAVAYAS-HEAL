"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Clock, MapPin, Heart, MessageCircle, Phone, Video, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SiteFooter } from "@/components/site-footer"
import { ReviewSystem } from "@/components/review-system"
import { getProfessionalById, getReviewsForProfessional, type Professional } from "@/services/professional-service"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function ProfessionalPage({ params }: { params: { id: string } }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [reviews, setReviews] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch professional data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const proData = await getProfessionalById(params.id)
        setProfessional(proData)

        if (proData) {
          const reviewsData = await getReviewsForProfessional(proData.id)
          setReviews(reviewsData)
        }
      } catch (error) {
        console.error("Error fetching professional data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  // Mock available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split("T")[0]
  })

  // Mock available times
  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="mt-4 text-gray-600">Loading professional details...</p>
      </div>
    )
  }

  if (!professional) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Professional Not Found</h1>
        <p className="text-gray-600 mb-4">We couldn't find the professional you're looking for.</p>
        <Button asChild className="bg-pink-500 hover:bg-pink-600">
          <Link href="/professionals">Browse All Professionals</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gradient-to-b from-pink-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Button
                asChild
                variant="ghost"
                className="group mb-4 flex items-center gap-1 text-pink-800 hover:text-pink-600"
              >
                <Link href="/professionals">
                  <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Professionals
                </Link>
              </Button>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative w-full md:w-auto flex-shrink-0 mb-4 md:mb-0">
                    <div className="absolute -inset-2 rounded-xl bg-pink-100 blur-lg opacity-30"></div>
                    <Image
                      src={professional.imageSrc || "/placeholder.svg"}
                      width={200}
                      height={200}
                      alt={professional.name}
                      className="rounded-xl object-cover shadow-md relative z-10 w-full md:w-auto max-w-[200px] mx-auto md:mx-0"
                    />
                  </div>
                  <div className="space-y-3 w-full">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-pink-800">
                        {professional.name}
                      </h1>
                      <p className="text-lg text-gray-600">{professional.title}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{professional.rating}</span>
                      <span className="text-gray-600">({professional.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {professional.specialties?.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-pink-200 text-pink-500">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">50 min session</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{professional.location || "Mumbai, India"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="space-y-6 pt-4">
                    <div>
                      <h2 className="text-xl font-bold text-pink-800 mb-2">Biography</h2>
                      <p className="text-gray-600">{professional.bio}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-pink-800 mb-2">Education & Training</h2>
                      <ul className="space-y-1 text-gray-600">
                        {professional.education?.map((edu, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-pink-500" />
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-pink-800 mb-2">Languages</h2>
                      <div className="flex flex-wrap gap-2">
                        {professional.languages?.map((language, index) => (
                          <Badge key={index} variant="secondary">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-pink-800 mb-2">Session Types</h2>
                      <div className="flex flex-wrap gap-4">
                        {professional.sessionTypes?.map((type, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {type === "Video Call" && <Video className="h-4 w-4 text-pink-500" />}
                            {type === "Phone Call" && <Phone className="h-4 w-4 text-pink-500" />}
                            {type === "In-Person" && <MapPin className="h-4 w-4 text-pink-500" />}
                            <span className="text-gray-600">{type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="pt-4">
                    {reviews ? (
                      <ReviewSystem
                        professionalId={professional.id}
                        professionalName={professional.name}
                        overallRating={reviews.overallRating}
                        totalReviews={reviews.totalReviews}
                        ratingBreakdown={reviews.ratingBreakdown}
                        reviews={reviews.reviews}
                      />
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600">No reviews available yet.</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="faq" className="space-y-6 pt-4">
                    <h2 className="text-xl font-bold text-pink-800">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-pink-800">What can I expect in the first session?</h3>
                        <p className="text-gray-600">
                          In our first session, we'll discuss what brings you to therapy, your background, and your
                          goals. This helps me understand your needs and develop a personalized treatment plan. It's
                          also an opportunity for you to ask questions and see if we're a good fit.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-pink-800">How often will we meet?</h3>
                        <p className="text-gray-600">
                          Most clients start with weekly sessions, but this can vary based on your needs and progress.
                          We'll discuss the recommended frequency during our initial consultation and adjust as needed.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-pink-800">Do you accept insurance?</h3>
                        <p className="text-gray-600">
                          I am an in-network provider with several major insurance companies. Please contact your
                          insurance provider to verify coverage for mental health services. I can also provide
                          documentation for out-of-network reimbursement.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-pink-800">What is your cancellation policy?</h3>
                        <p className="text-gray-600">
                          I require 24 hours notice for cancellations to avoid being charged for the session. I
                          understand that emergencies happen, and these situations will be handled on a case-by-case
                          basis.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:sticky lg:top-24 mt-6 lg:mt-0"
              >
                <Card className="border-pink-100">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-pink-800">Book a Session</h2>
                        <Badge className="bg-pink-500">₹{professional.price}/session</Badge>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-medium text-pink-800">Select a Date</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {availableDates.slice(0, 6).map((date) => (
                            <Button
                              key={date}
                              variant={selectedDate === date ? "default" : "outline"}
                              className={`h-auto py-2 px-1 text-xs ${
                                selectedDate === date
                                  ? "bg-pink-500 hover:bg-pink-600"
                                  : "border-pink-200 hover:bg-pink-50"
                              }`}
                              onClick={() => setSelectedDate(date)}
                            >
                              {formatDate(date)}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {selectedDate && (
                        <div className="space-y-3">
                          <h3 className="font-medium text-pink-800">Select a Time</h3>
                          <div className="grid grid-cols-3 gap-2">
                            {availableTimes.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                className={`h-auto py-2 text-xs ${
                                  selectedTime === time
                                    ? "bg-pink-500 hover:bg-pink-600"
                                    : "border-pink-200 hover:bg-pink-50"
                                }`}
                                onClick={() => setSelectedTime(time)}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <h3 className="font-medium text-pink-800">Session Type</h3>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-1 h-auto py-3 border-pink-200 hover:bg-pink-50"
                          >
                            <Video className="h-5 w-5 text-pink-500" />
                            <span className="text-xs">Video</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-1 h-auto py-3 border-pink-200 hover:bg-pink-50"
                          >
                            <Phone className="h-5 w-5 text-pink-500" />
                            <span className="text-xs">Phone</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex flex-col items-center gap-1 h-auto py-3 border-pink-200 hover:bg-pink-50"
                          >
                            <MapPin className="h-5 w-5 text-pink-500" />
                            <span className="text-xs">In-Person</span>
                          </Button>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-pink-500 hover:bg-pink-600 transition-transform duration-300 hover:scale-105"
                        disabled={!selectedDate || !selectedTime}
                      >
                        Book Appointment
                      </Button>

                      <div className="flex justify-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                        >
                          <Heart className="mr-1 h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                        >
                          <MessageCircle className="mr-1 h-4 w-4" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

