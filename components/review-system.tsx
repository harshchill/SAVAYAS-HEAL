"use client"

import { useState } from "react"
import { Star, Search, ThumbsUp, Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Review {
  id: string
  authorName: string
  authorAvatar?: string
  rating: number
  date: string
  content: string
  helpful: number
  verified: boolean
}

interface ReviewSystemProps {
  professionalId: string
  professionalName: string
  overallRating: number
  totalReviews: number
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  reviews: Review[]
}

export function ReviewSystem({
  professionalId,
  professionalName,
  overallRating,
  totalReviews,
  ratingBreakdown,
  reviews: initialReviews,
}: ReviewSystemProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(initialReviews)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("recent")
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [reviewContent, setReviewContent] = useState("")
  const [reviewRating, setReviewRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate percentages for rating breakdown
  const calculatePercentage = (count: number) => {
    return Math.round((count / totalReviews) * 100) || 0
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredReviews(reviews)
      return
    }

    const filtered = reviews.filter(
      (review) =>
        review.content.toLowerCase().includes(query.toLowerCase()) ||
        review.authorName.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredReviews(filtered)
  }

  // Handle sort
  const handleSort = (option: string) => {
    if (option === sortOption) return // Don't re-sort if the option hasn't changed

    setSortOption(option)
    const sorted = [...filteredReviews]

    switch (option) {
      case "recent":
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "oldest":
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "highest":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "lowest":
        sorted.sort((a, b) => a.rating - b.rating)
        break
      case "helpful":
        sorted.sort((a, b) => b.helpful - a.helpful)
        break
    }

    setFilteredReviews(sorted)
  }

  // Handle filter by rating
  const handleFilterRating = (rating: number | null) => {
    if (rating === filterRating) return // Don't re-filter if the rating hasn't changed

    setFilterRating(rating)

    if (rating === null) {
      setFilteredReviews(reviews)
      return
    }

    const filtered = reviews.filter((review) => review.rating === rating)
    setFilteredReviews(filtered)
  }

  // Handle submit review
  const handleSubmitReview = () => {
    if (reviewRating === 0 || !reviewContent.trim()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReview: Review = {
        id: `review-${Date.now()}`,
        authorName: "You",
        rating: reviewRating,
        date: new Date().toISOString(),
        content: reviewContent,
        helpful: 0,
        verified: true,
      }

      const updatedReviews = [newReview, ...reviews]
      setReviews(updatedReviews)
      setFilteredReviews(updatedReviews)
      setReviewContent("")
      setReviewRating(0)
      setIsSubmitting(false)
    }, 1000)
  }

  // Handle mark as helpful
  const handleMarkHelpful = (reviewId: string) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return { ...review, helpful: review.helpful + 1 }
      }
      return review
    })

    setReviews(updatedReviews)
    setFilteredReviews(updatedReviews)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reviews & Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            {/* Rating Summary */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold">{overallRating.toFixed(1)}</div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(overallRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">{totalReviews} reviews</p>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center w-12">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${calculatePercentage(ratingBreakdown[rating as keyof typeof ratingBreakdown])}%`,
                        }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-500">
                      {calculatePercentage(ratingBreakdown[rating as keyof typeof ratingBreakdown])}%
                    </div>
                  </div>
                ))}
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-pink-500 hover:bg-pink-600">Write a Review</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Review {professionalName}</DialogTitle>
                    <DialogDescription>Share your experience to help others make informed decisions.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= reviewRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <Textarea
                      placeholder="Share your experience with this professional..."
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      rows={5}
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={handleSubmitReview}
                      disabled={reviewRating === 0 || !reviewContent.trim() || isSubmitting}
                      className="bg-pink-500 hover:bg-pink-600"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search reviews..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={sortOption} onValueChange={handleSort}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="highest">Highest Rated</SelectItem>
                      <SelectItem value="lowest">Lowest Rated</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filterRating ? filterRating.toString() : "all"}
                    onValueChange={(value) => handleFilterRating(value === "all" ? null : Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredReviews.length > 0 ? (
                <div className="space-y-4">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.authorAvatar || "/placeholder.svg?height=40&width=40"} />
                            <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.authorName}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>

                        {review.verified && (
                          <Badge variant="outline" className="border-green-200 text-green-700">
                            Verified Client
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-gray-700">{review.content}</p>

                      <div className="flex justify-between items-center pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkHelpful(review.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </Button>

                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                          <Flag className="h-4 w-4 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-gray-500">No reviews match your criteria.</p>
                  {(searchQuery || filterRating) && (
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery("")
                        setFilterRating(null)
                        setFilteredReviews(reviews)
                      }}
                      className="mt-2"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

