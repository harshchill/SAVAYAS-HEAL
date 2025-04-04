"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProfessionalCardProps {
  id: string
  name: string
  title: string
  specialty: string
  rating: number
  reviews: number
  price: number
  imageSrc: string
}

export function ProfessionalCard({
  id,
  name,
  title,
  specialty,
  rating,
  reviews,
  price,
  imageSrc,
}: ProfessionalCardProps) {
  return (
    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }} className="h-full">
      <Card className="overflow-hidden border-pink-100 transition-all duration-200 hover:shadow-lg h-full flex flex-col bg-white/90 backdrop-blur-sm">
        <div className="aspect-square overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 to-transparent z-0"></div>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105 relative z-10"
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-pink-800 line-clamp-1">{name}</h3>
              <Badge variant="outline" className="border-pink-200 text-pink-500 whitespace-nowrap">
                ₹{price}/hr
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-sm font-medium line-clamp-2">Specializes in: {specialty}</p>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-sm text-gray-600">({reviews} reviews)</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button
            asChild
            className="w-full bg-pink-500 hover:bg-pink-600 transition-transform duration-200 hover:scale-105"
          >
            <Link href={`/professional/${id}`}>Book Session</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

