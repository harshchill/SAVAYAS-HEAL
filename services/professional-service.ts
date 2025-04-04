import { cache } from "react"

export interface Professional {
  id: string
  name: string
  title: string
  specialty: string
  rating: number
  reviews: number
  price: number
  imageSrc: string
  bio?: string
  education?: string[]
  specialties?: string[]
  languages?: string[]
  sessionTypes?: string[]
  location?: string
  availability?: string[]
}

interface ApiResponse<T> {
  data: T
  error?: string
}

/**
 * API Integration Notes:
 *
 * This service is designed to fetch data from a backend API. The current implementation
 * includes fallback mock data for development and demonstration purposes.
 *
 * In a production environment:
 * 1. Replace the mock data with actual API calls to your backend
 * 2. Use environment variables for API URLs and authentication
 * 3. Implement proper error handling and loading states
 * 4. Consider adding pagination for large data sets
 *
 * Example API endpoints that would be needed:
 * - GET /api/professionals - List all professionals with optional filters
 * - GET /api/professionals/:id - Get a single professional by ID
 * - GET /api/professionals/:id/reviews - Get reviews for a professional
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

// Fetch professionals from the API
export const getProfessionals = cache(async (filters?: any): Promise<Professional[]> => {
  try {
    // Build query parameters for filtering
    const queryParams = new URLSearchParams()

    if (filters) {
      if (filters.search) queryParams.append("search", filters.search)
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice.toString())
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice.toString())
      if (filters.specialties && filters.specialties.length > 0) {
        filters.specialties.forEach((specialty: string) => {
          queryParams.append("specialty", specialty)
        })
      }
      if (filters.type && filters.type.length > 0) {
        filters.type.forEach((type: string) => {
          queryParams.append("type", type)
        })
      }
    }

    // In a real application, this would be a fetch to your API
    // const response = await fetch(`${API_URL}/api/professionals?${queryParams.toString()}`)
    // const data: ApiResponse<Professional[]> = await response.json()

    // if (data.error) {
    //   throw new Error(data.error)
    // }

    // return data.data

    // For now, we'll simulate a delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    // This is a fallback for development/demo purposes
    // In production, this would be replaced with actual API calls
    return [
      {
        id: "dr-sarah-johnson",
        name: "Dr. Sarah Johnson",
        title: "Psychiatrist",
        specialty: "Anxiety & Depression",
        rating: 4.9,
        reviews: 124,
        price: 1200,
        imageSrc: "/placeholder.svg?height=300&width=300",
        bio: "Dr. Sarah Johnson is a licensed psychiatrist with over 10 years of experience helping individuals overcome anxiety, depression, and other mental health challenges.",
        specialties: ["Anxiety", "Depression", "Stress Management"],
        languages: ["English", "Hindi"],
        sessionTypes: ["Video Call", "Phone Call", "In-Person"],
        location: "Mumbai, India",
        availability: ["Weekdays", "Evenings"],
      },
      {
        id: "dr-michael-chen",
        name: "Dr. Michael Chen",
        title: "Psychiatrist",
        specialty: "ADHD & Stress Management",
        rating: 4.8,
        reviews: 98,
        price: 1350,
        imageSrc: "/placeholder.svg?height=300&width=300",
        specialties: ["ADHD", "Stress Management", "Anxiety"],
        languages: ["English", "Mandarin", "Hindi"],
        sessionTypes: ["Video Call", "In-Person"],
        location: "Delhi, India",
      },
      {
        id: "dr-emily-rodriguez",
        name: "Dr. Emily Rodriguez",
        title: "Clinical Psychologist",
        specialty: "Trauma & PTSD",
        rating: 4.9,
        reviews: 156,
        price: 1100,
        imageSrc: "/placeholder.svg?height=300&width=300",
        specialties: ["Trauma", "PTSD", "Anxiety", "Depression"],
        languages: ["English", "Spanish", "Hindi"],
        sessionTypes: ["Video Call", "Phone Call", "In-Person"],
        location: "Bangalore, India",
      },
      {
        id: "dr-jessica-williams",
        name: "Dr. Jessica Williams",
        title: "Relationship Therapist",
        specialty: "Couples Therapy",
        rating: 4.9,
        reviews: 142,
        price: 1300,
        imageSrc: "/placeholder.svg?height=300&width=300",
        specialties: ["Relationships", "Couples Therapy", "Communication"],
        languages: ["English", "Hindi"],
        sessionTypes: ["Video Call", "In-Person"],
        location: "Mumbai, India",
      },
      {
        id: "emma-thompson",
        name: "Emma Thompson",
        title: "Certified Listener",
        specialty: "Grief & Loss",
        rating: 4.9,
        reviews: 78,
        price: 450,
        imageSrc: "/placeholder.svg?height=300&width=300",
        specialties: ["Grief", "Loss", "Emotional Support"],
        languages: ["English", "Hindi"],
        sessionTypes: ["Video Call", "Phone Call"],
        location: "Remote",
      },
    ]
  } catch (error) {
    console.error("Error fetching professionals:", error)
    return []
  }
})

// Fetch a single professional by ID
export const getProfessionalById = cache(async (id: string): Promise<Professional | null> => {
  try {
    // In a real application, this would be a fetch to your API
    // const response = await fetch(`${API_URL}/api/professionals/${id}`)
    // const data: ApiResponse<Professional> = await response.json()

    // if (data.error) {
    //   throw new Error(data.error)
    // }

    // return data.data

    // For now, we'll simulate a delay and return mock data if it matches
    await new Promise((resolve) => setTimeout(resolve, 500))

    const professionals = await getProfessionals()
    return professionals.find((pro) => pro.id === id) || null
  } catch (error) {
    console.error("Error fetching professional:", error)
    return null
  }
})

// Fetch reviews for a professional
export const getReviewsForProfessional = cache(async (professionalId: string) => {
  try {
    // In a real application, this would be a fetch to your API
    // const response = await fetch(`${API_URL}/api/professionals/${professionalId}/reviews`)
    // const data = await response.json()

    // if (data.error) {
    //   throw new Error(data.error)
    // }

    // return data.data

    // For now, we'll simulate a delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    // This is a fallback for development/demo purposes
    // In production, this would be replaced with actual API calls
    return {
      overallRating: 4.8,
      totalReviews: 124,
      ratingBreakdown: {
        5: 98,
        4: 20,
        3: 4,
        2: 1,
        1: 1,
      },
      reviews: [
        {
          id: "review-1",
          authorName: "Priya Sharma",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          rating: 5,
          date: "2025-03-15T10:30:00Z",
          content:
            "Very helpful and understanding. Provided practical strategies that have made a significant difference.",
          helpful: 12,
          verified: true,
        },
        {
          id: "review-2",
          authorName: "Rahul Patel",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          rating: 5,
          date: "2025-03-01T14:45:00Z",
          content:
            "I've noticed a remarkable improvement in my mood and overall well-being. Very attentive and compassionate.",
          helpful: 8,
          verified: true,
        },
        {
          id: "review-3",
          authorName: "Ananya Gupta",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          rating: 4,
          date: "2025-02-20T09:15:00Z",
          content: "Very professional and knowledgeable. Sometimes the sessions feel a bit rushed.",
          helpful: 5,
          verified: true,
        },
      ],
    }
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return {
      overallRating: 0,
      totalReviews: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      reviews: [],
    }
  }
})

